import { postRouting } from "@/apis/route";
import { LocationObjectCoords } from "expo-location";
import { atom, useAtom } from "jotai";

const isScreenShotAtom = atom(false);
const currentUuidAtom = atom("");
const startLocationAtom = atom<LocationObjectCoords | null>(null);
const numGenerationAtom = atom(0);
const routeIndexAtom = atom(0);
const routeAtom = atom<Coordinate[]>([]);

export default function useRouting() {
  const [isScreenShot, setIsScreenShot] = useAtom(isScreenShotAtom);
  const [currentUuid, setCurrentUuid] = useAtom(currentUuidAtom);
  const [startLocation, setStartLocation] = useAtom(startLocationAtom);
  const [numGeneration, setNumGeneration] = useAtom(numGenerationAtom);
  const [route, setRoute] = useAtom(routeAtom);
  const [routeIndex, setRouteIndex] = useAtom(routeIndexAtom);

  const makeRoute = async (uuid: string, currentLocation: LocationObjectCoords) => {
    setCurrentUuid(uuid);
    setStartLocation(currentLocation);
    try {
      console.log("[useRouting] makeRoute", uuid, currentLocation);
      const res = await postRouting(uuid, currentLocation, numGeneration);
      setNumGeneration(numGeneration + 1);
      setRoute(res);
      console.log("[useRouting] makeRoute route length", res.length);
    } catch (error) {
      console.error(error);
    }
  };

  const remakeRoute = async () => {
    if (!currentUuid || !startLocation) {
      return;
    }
    setRouteIndex(0);
    setRoute([]);
    try {
      console.log("[useRouting] remakeRoute", currentUuid, startLocation);
      const res = await postRouting(currentUuid, startLocation, numGeneration);
      setNumGeneration(numGeneration + 1);
      setRoute(res);
      console.log("[useRouting] remakeRoute route length", res.length);
    } catch (error) {
      console.error(error);
    }
  };

  return { route, makeRoute, remakeRoute, routeIndex, setRouteIndex, isScreenShot, setIsScreenShot };
}
