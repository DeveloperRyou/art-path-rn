import GoMyLocationButton from "@/components/map/GoMyLocationButton";
import Navigation from "@/components/map/Navigation";
import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import hachiko from "./hachiko.json";

interface MapViewerProps {}

const startCord = {
  latitude: 35.8611,
  longitude: 128.64,
};
const endCord = {
  latitude: 35.859,
  longitude: 128.6264,
};

export default function MapViewer({}: MapViewerProps) {
  const [didInitCamera, setDidInitCamera] = useState(false);
  const [route, setRoute] = useState<Coordinate[]>([]);
  const ref = useRef<MapView>(null);

  const pathList: Coordinate[] = [];
  for (let i = 0; i < hachiko.length; i++) {
    pathList.push(hachiko[i]);
  }

  const { currentLocation, subscribeLocation, unsubscribeLocation } = useCurrentLocation();

  useEffect(() => {
    subscribeLocation();
    return () => {
      unsubscribeLocation();
    };
  }, []);

  useEffect(() => {
    if (currentLocation && !didInitCamera) {
      ref.current?.animateCamera({
        center: currentLocation,
        altitude: 10000,
      });
      setDidInitCamera(true);
    }
  }, [currentLocation]);

  return (
    <>
      <MapView
        ref={ref}
        style={styles.map}
        showsUserLocation
        onUserLocationChange={(event) => {
          console.log(event.nativeEvent.coordinate);
        }}
      >
        {hachiko.map((coordinate, i) => (
          <Marker key={i} coordinate={coordinate} />
        ))}
        <Marker coordinate={startCord} />
        <Marker coordinate={endCord} />
        <MapViewDirections
          mode="TRANSIT"
          origin={startCord}
          destination={endCord}
          apikey={process.env.EXPO_PUBLIC_API_KEY as string}
          onReady={(res) => {
            setRoute(res.coordinates);
          }}
        />
      </MapView>
      <Navigation route={route} />
      <GoMyLocationButton
        onPress={() => {
          ref.current?.animateCamera({
            altitude: 10000,
            center: currentLocation,
          });
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
