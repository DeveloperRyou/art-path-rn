import useCurrentLocation from "@/hooks/useCurrentLocation";
import { useEffect } from "react";
import { Marker } from "react-native-maps";

export default function CurrentLocationMarker() {
  const { currentLocation, subscribeLocation, unsubscribeLocation } = useCurrentLocation();
  useEffect(() => {
    subscribeLocation();
    return () => {
      unsubscribeLocation();
    };
  }, []);
  return (
    <Marker
      key="current-location-marker"
      coordinate={{
        latitude: currentLocation?.latitude as number,
        longitude: currentLocation?.longitude as number,
      }}
      image={require("@/assets/image/current-location-marker.png")}
    />
  );
}
