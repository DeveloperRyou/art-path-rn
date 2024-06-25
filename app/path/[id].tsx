import MapViewer from "@/components/map/MapViewer";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
  const local = useLocalSearchParams();
  const id = local.id;
  console.log("[path]", id);
  return <MapViewer id={id as string} />;
}
