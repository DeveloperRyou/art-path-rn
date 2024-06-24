import * as Location from "expo-location";
import { atom, useAtom } from "jotai";

const locationHistoryAtom = atom<Location.LocationObjectCoords[]>([]);
const currentLocationAtom = atom<Location.LocationObjectCoords | undefined>(undefined);

export default function useCurrentLocation() {
  const [locationHistory, setLocationHistory] = useAtom(locationHistoryAtom);
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);

  const getPermission = async () => {
    const resFore = await Location.requestForegroundPermissionsAsync();
    console.log("[useCurrentLocation]", resFore);
    const resBack = await Location.requestBackgroundPermissionsAsync();
    console.log("[useCurrentLocation]", resBack);
  };

  const setLocation = (coord: Location.LocationObjectCoords) => {
    setCurrentLocation(coord);
    setLocationHistory([...locationHistory, coord]);
  };

  const getCurrentLocation = async () => {
    await getPermission();
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

  return { currentLocation, locationHistory, setLocation, getCurrentLocation };
}
