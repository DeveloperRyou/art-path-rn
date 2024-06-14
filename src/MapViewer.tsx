import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import hachiko from "./hachiko.json";

interface MapViewerProps {}

export default function MapViewer({}: MapViewerProps) {
  const pathList: Coordinate[][] = [];
  for (let i = 0; i < hachiko.length; i += 20) {
    pathList.push(hachiko.slice(i, i + 21 < hachiko.length ? i + 21 : hachiko.length));
  }
  const initialRegion = {
    ...hachiko[0],
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const initialCamera = {
    center: hachiko[0],
    pitch: 0,
    heading: 0,
    altitude: 0,
    zoom: 1,
  };
  return (
    <MapView style={styles.map} initialRegion={initialRegion} initialCamera={initialCamera}>
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
