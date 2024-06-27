import FinishRoute from "@/components/map/FinishRoute";
import GoMyLocationButton from "@/components/map/GoMyLocationButton";
import Navigation from "@/components/map/Navigation";
import useRouting from "@/hooks/useRouting";
import { LocationObjectCoords } from "expo-location";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import MakingRouteDisplay from "@/components/map/MakingRouteDisplay";
import { postRecord } from "@/apis/record";
import { useAuth } from "@/hooks/useAuth";

interface MapViewerProps {
  id: string;
}
export default function MapViewer({ id }: MapViewerProps) {
  const { auth } = useAuth();
  const { route, routeIndex, makeRoute, isScreenShot, setIsScreenShot } = useRouting();
  const { currentLocation, setLocation } = useCurrentLocation();
  const [didInitCamera, setDidInitCamera] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const ref = useRef<MapView>(null);

  useEffect(() => {
    if (routeIndex >= route.length && route.length > 0) {
      postRecord(auth?.user.id ?? "", id).catch((e) => {
        console.error(e);
      });
    }
  }, [routeIndex]);

  useEffect(() => {
    if (currentLocation && !didInitCamera) {
      ref.current?.animateCamera({
        center: currentLocation,
        altitude: 20000,
      });
      makeRoute(id, currentLocation);
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
        {!isScreenShot && (
          <>
            <Marker coordinate={route[routeIndex]} image={require("@/assets/image/start-marker.png")} />
            <Marker coordinate={route[routeIndex + 1]} image={require("@/assets/image/end-marker.png")} />
          </>
        )}
        {route.map((coordinate, i) => (
          <MapViewDirections
            key={i}
            mode="WALKING"
            origin={route[i]}
            destination={route[i + 1]}
            apikey={"AIzaSyDNOO0VmI3stBc7bcXxNz2RuUF_MT-epQ8"}
            strokeWidth={4}
            strokeColor={i < routeIndex ? "blue" : "#A0A0A0"}
          />
        ))}
      </MapView>
      {!isScreenShot && <Navigation />}
      {!isScreenShot && (
        <GoMyLocationButton
          onPress={() => {
            ref.current?.animateCamera({
              altitude: 20000,
              center: currentLocation,
            });
          }}
        />
      )}
      {!isScreenShot && isStarted === false && <MakingRouteDisplay startRoute={() => setIsStarted(true)} />}
      {!isScreenShot && isStarted && routeIndex >= route.length && <FinishRoute />}
      {isScreenShot && (
        <TouchableOpacity
          style={{ position: "absolute", top: 80, left: 20, borderWidth: 1, padding: 8, borderRadius: 4 }}
          onPress={() => setIsScreenShot(false)}
        >
          <Text>戻る</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
