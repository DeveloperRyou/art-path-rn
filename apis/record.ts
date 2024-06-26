import api from "@/apis/network";

interface RecordInfo {
  id: string;
  name: string;
  profile_image: string;
  owner_id: string;
}

async function getRecordList(user_id: string): Promise<RecordInfo[]> {
  const res = await api.get<RecordInfo[]>(`/records/${user_id}`);
  return res.data;
}

async function postRecord(user_id: string, illust_metadata_id: string): Promise<RecordInfo> {
  const res = await api.post<RecordInfo>(`/records/${user_id}/${illust_metadata_id}`);
  return res.data;
}

export { getRecordList, postRecord };
