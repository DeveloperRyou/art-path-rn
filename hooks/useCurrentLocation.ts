import * as Location from "expo-location";
import { atom, useAtom } from "jotai";

const locationHistoryAtom = atom<Location.LocationObjectCoords[]>([]);
const currentLocationAtom = atom<Location.LocationObjectCoords | undefined>(undefined);

export default function useCurrentLocation() {
  let locationTracker: Location.LocationSubscription | undefined;
  const [locationHistory, setLocationHistory] = useAtom(locationHistoryAtom);
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);

  const getPermission = async () => {
    const resFore = await Location.requestForegroundPermissionsAsync();
    console.log("[useCurrentLocation]", resFore);
    const resBack = await Location.requestBackgroundPermissionsAsync();
    console.log("[useCurrentLocation]", resBack);
  };

  const subscribeLocation = async () => {
    await getPermission();
    locationTracker = await Location.watchPositionAsync(
      { accuracy: Location.LocationAccuracy.BestForNavigation },
      (location) => {
        console.log(
          "[useCurrentLocation] subscribeLocation:",
          location.coords.latitude,
          location.coords.longitude,
          location.coords.heading
        );
        setCurrentLocation(location.coords);
        setLocationHistory([...locationHistory, location.coords]);
      }
    );
  };

  const unsubscribeLocation = async () => {
    if (locationTracker) {
      locationTracker.remove();
    }
  };

  const getCurrentLocation = async () => {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.BestForNavigation,
    });
    console.log(
      "[useCurrentLocation] getCurrentLocation:",
      location.coords.latitude,
      location.coords.longitude,
      location.coords.heading
    );
    return location.coords;
  };

  return { currentLocation, locationHistory, subscribeLocation, unsubscribeLocation, getCurrentLocation };
}
