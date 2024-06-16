import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import hachiko from "./hachiko.json";

interface MapViewerProps {}

const initialCamera = {
  pitch: 0,
  heading: 0,
  altitude: 5000,
  zoom: 0,
};

export default function MapViewer({}: MapViewerProps) {
  const [region, setRegion] = useState<LatLng | undefined>(undefined);
  const getPermission = async () => {
    const resFore = await Location.requestForegroundPermissionsAsync();
    console.log(resFore);
    const resBack = await Location.requestBackgroundPermissionsAsync();
    console.log(resBack);
  };

  useEffect(() => {
    getPermission();
    Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
      console.log(location.coords.latitude, location.coords.longitude);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    });
  }, []);

  const pathList: Coordinate[][] = [];
  for (let i = 0; i < hachiko.length; i += 20) {
    pathList.push(hachiko.slice(i, i + 21 < hachiko.length ? i + 21 : hachiko.length));
  }
  return (
    <MapView
      style={styles.map}
      initialCamera={{ ...initialCamera, center: region as LatLng }}
      camera={{ ...initialCamera, center: region as LatLng }}
    >
      <Marker coordinate={region as LatLng} />
      {hachiko.map((coordinate, i) => (
        <Marker key={i} coordinate={coordinate} />
      ))}
      {pathList.map((path, i) => (
        <MapViewDirections
          key={i}
          mode="WALKING"
          origin={path[0]}
          waypoints={path.slice(1, path.length - 1)}
          destination={path[path.length - 1]}
          apikey={process.env.EXPO_PUBLIC_API_KEY as string}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
