import api from "@/apis/network";

async function getIllustMetadataList(): Promise<PathInfo[]> {
  const res = await api.get<PathInfo[]>("/illust_metadata_list");
  return res.data;
}

export { getIllustMetadataList };
