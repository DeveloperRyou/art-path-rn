import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

interface MapViewerProps {}

export default function MapViewer({}: MapViewerProps) {
  return <MapView />;
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
