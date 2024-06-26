import api from "@/apis/network";
import { LocationObjectCoords } from "expo-location";

async function postRouting(uuid: string, coord: LocationObjectCoords, numGeneration = 0, distance = 10) {
  const res = await api.post<Coordinate[]>(
    `/routing?latitude=${coord.latitude}&longitude=${coord.longitude}&illust_metadata_id=${uuid}&num_generation=${numGeneration}&distance=${distance}`
  );
  return res.data;
}

export { postRouting };
