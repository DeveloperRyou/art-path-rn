import { getIllustMetadataList } from "@/apis/metadata";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

interface PathImages {
  [key: string]: { [key: string]: any };
}

const pathImagesAtom = atom<PathImages>({});
const categoryAtom = atom<string>("記号");

export default function usePathImages() {
  const [pathImages, setPathImages] = useAtom(pathImagesAtom);
  const [currentCategory, setCurrentCategory] = useAtom(categoryAtom);
  useEffect(() => {
    getIllustMetadataList().then((illustMetadataList) => {
      // make pathImages
      const newPaths: PathImages = {};
      illustMetadataList.forEach((illustMetadata) => {
        const category = illustMetadata.genre;
        if (!newPaths[category]) {
          newPaths[category] = {};
        }
        newPaths[category][illustMetadata.name] = illustMetadata.original_image;
      });
      setPathImages(newPaths);

      // set currentCategory
      if (!newPaths[currentCategory]) {
        setCurrentCategory(Object.keys(newPaths)[0]);
      }
    });
  }, []);

  return { pathImages, currentCategory, setCurrentCategory };
}
