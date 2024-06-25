import { getIllustMetadataList } from "@/apis/metadata";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

interface PathImages {
  [key: string]: { [key: string]: PathInfo };
}

const pathImagesAtom = atom<PathImages>({});
const categoryAtom = atom<string>("記号");

export default function usePathImages() {
  const [pathImages, setPathImages] = useAtom(pathImagesAtom);
  const [currentCategory, setCurrentCategory] = useAtom(categoryAtom);
  const setAtomsInitialValue = async () => {
    try {
      const illustMetadataList = await getIllustMetadataList();
      console.log("[usePathImages] illustMetadataList", illustMetadataList.length);

      const newPaths: PathImages = {};
      illustMetadataList.forEach((illustMetadata) => {
        const category = illustMetadata.genre;
        if (!newPaths[category]) {
          newPaths[category] = {};
        }
        newPaths[category][illustMetadata.name] = illustMetadata;
      });
      setPathImages(newPaths);
      if (!newPaths[currentCategory]) {
        setCurrentCategory(Object.keys(newPaths)[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setAtomsInitialValue();
  }, []);

  return { pathImages, currentCategory, setCurrentCategory };
}
