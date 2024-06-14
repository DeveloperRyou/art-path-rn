import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

interface MapViewerProps {}

export default function MapViewer({}: MapViewerProps) {
  return <MapView style={styles.map} />;
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
