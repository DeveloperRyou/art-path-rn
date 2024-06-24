import { atom, useAtom } from "jotai";

interface PathImages {
  [key: string]: { [key: string]: any };
}

// function that read assets/images/map folder and return filename to PathImages Object
const pathImages: PathImages = {
  記号: {
    老人ホーム: require("@/assets/image/map/記号/老人ホーム.png"),
  },
  都道府県: {
    北海道: require("@/assets/image/map/都道府県/北海道.png"),
  },
};

const categoryAtom = atom<string>("記号");

export default function usePathImages() {
  const [currentCategory, setCurrentCategory] = useAtom(categoryAtom);
  return { pathImages, currentCategory, setCurrentCategory };
}
