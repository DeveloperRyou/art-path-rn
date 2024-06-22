import { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import hachiko from "./hachiko.json";

interface MapViewerProps {}

export default function MapViewer({}: MapViewerProps) {
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

  return (
    <>
      <MapView
        style={styles.map}
        onPanDrag={(event) => {
          // use MapView's method setCamera to change the camera position
          //console.log(event.nativeEvent.coordinate);
        }}
        showsBuildings
        showsIndoorLevelPicker
        showsTraffic
        showsIndoors
        showsUserLocation
        onUserLocationChange={(event) => {
          console.log(event.nativeEvent.coordinate);
        }}
      >
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
      <TouchableOpacity
        style={styles.currentButton}
        onPress={() => {
          console.log("currentLocation", currentLocation);
        }}
      >
        <Image source={require("@/assets/image/current-location-marker.png")} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  currentButton: {
    position: "absolute",
    bottom: 64,
    right: 32,
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 8,
  },
});
