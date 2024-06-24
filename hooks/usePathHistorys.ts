import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const pathHistorysAtom = atom<PathInfo[]>([]);

export default function usePathHistorys() {
  const [pathHistorys, setPathHistorys] = useAtom(pathHistorysAtom);
  useEffect(() => {}, []);

  return { pathHistorys };
}
