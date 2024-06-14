import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

interface MapViewerProps {}

export default function MapViewer({}: MapViewerProps) {
  return (
    <MapView style={styles.map}>
      <MapViewDirections
        origin={{ latitude: 37.3318456, longitude: -122.0296002 }}
        destination={{ latitude: 37.771707, longitude: -122.4053769 }}
        apikey={process.env.EXPO_PUBLIC_API_KEY as string}
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
