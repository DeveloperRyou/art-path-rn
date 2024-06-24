import api from "@/apis/network";

interface IllustMetadata {
  id: string;
  name: string;
  genre: string;
  original_image: string;
}

async function getIllustMetadataList(): Promise<IllustMetadata[]> {
  const res = await api.get<IllustMetadata[]>("/illust_metadata_list");
  return res.data;
}

export { getIllustMetadataList };
