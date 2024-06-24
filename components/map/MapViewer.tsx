import GoMyLocationButton from "@/components/map/GoMyLocationButton";
import Navigation from "@/components/map/Navigation";
import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import hachiko from "./hachiko.json";
import { LocationObjectCoords } from "expo-location";
import FinishRoute from "@/components/map/FinishRoute";

interface MapViewerProps {}

const endCord = {
  latitude: 36.4135,
  longitude: 127.338,
};

export default function MapViewer({}: MapViewerProps) {
  const { currentLocation, setLocation } = useCurrentLocation();
  const [startCord, setStartCord] = useState<Coordinate>();
  const [didInitCamera, setDidInitCamera] = useState(false);
  const [route, setRoute] = useState<Coordinate[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const ref = useRef<MapView>(null);

  const pathList: Coordinate[] = [];
  for (let i = 0; i < hachiko.length; i++) {
    pathList.push(hachiko[i]);
  }

  useEffect(() => {
    if (currentLocation && !didInitCamera) {
      setStartCord(currentLocation);
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
          if (event.nativeEvent.coordinate === undefined) return;
          console.log("[onUserLocationChange]", event.nativeEvent.coordinate);
          setLocation(event.nativeEvent.coordinate as LocationObjectCoords);
        }}
      >
        {hachiko.map((coordinate, i) => (
          <Marker key={i} coordinate={coordinate} />
        ))}
        {route.map((coordinate, i) => (
          <Marker key={i} coordinate={coordinate} />
        ))}
        <MapViewDirections
          mode="TRANSIT"
          origin={startCord as Coordinate}
          destination={endCord}
          apikey={process.env.EXPO_PUBLIC_API_KEY as string}
          onReady={(res) => {
            setRoute(res.coordinates);
          }}
        />
      </MapView>
      <Navigation
        route={route}
        callbackFinishNavigation={() => {
          setIsFinished(true);
        }}
      />
      <GoMyLocationButton
        onPress={() => {
          ref.current?.animateCamera({
            altitude: 10000,
            center: currentLocation,
          });
        }}
      />
      {isFinished && <FinishRoute />}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
