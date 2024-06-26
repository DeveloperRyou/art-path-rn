import { getRecordList } from "@/apis/record";
import { useAuth } from "@/hooks/useAuth";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const pathHistorysAtom = atom<PathInfo[]>([]);

export default function usePathHistorys() {
  const { auth } = useAuth();
  const [pathHistorys, setPathHistorys] = useAtom(pathHistorysAtom);

  const setAtomsInitialValue = async () => {
    try {
      const recordList = await getRecordList(auth?.user.id ?? "");
      console.log("[usePathHistorys] recordList", recordList.length);

      const pathInfoList: PathInfo[] = recordList.map((record) => {
        return {
          id: record.id,
          name: record.name,
          genre: "",
          original_image: record.profile_image,
        };
      });

      setPathHistorys(pathInfoList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setAtomsInitialValue();
  }, []);

  return { pathHistorys };
}
