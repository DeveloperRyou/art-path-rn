import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Camera, LatLng, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import hachiko from "./hachiko.json";
import CurrentLocationMarker from "@/components/map/CurrentLocationMarker";
import useCurrentLocation from "../../hooks/useCurrentLocation";

interface MapViewerProps {}

const initialCamera = {
  pitch: 0,
  heading: 0,
  altitude: 5000,
  zoom: 0,
};

export default function MapViewer({}: MapViewerProps) {
  const { currentLocation } = useCurrentLocation();
  const [camera, setCamera] = useState<Camera>({ ...initialCamera, center: currentLocation as LatLng });
  const pathList: Coordinate[] = [];
  for (let i = 0; i < hachiko.length; i++) {
    pathList.push(hachiko[i]);
  }

  useEffect(() => {
    if (currentLocation) {
      setCamera({ ...camera, center: currentLocation as LatLng });
    }
  }, [currentLocation]);

  return (
    <MapView style={styles.map} camera={camera}>
      <CurrentLocationMarker />
      {hachiko.map((coordinate, i) => (
        <Marker key={i} coordinate={coordinate} />
      ))}

      <MapViewDirections
        mode="WALKING"
        origin={pathList[0]}
        destination={pathList[1]}
        apikey={process.env.EXPO_PUBLIC_API_KEY as string}
        onReady={(res) => {
          console.log(res);
        }}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
