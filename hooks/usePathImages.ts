import * as 記号 from "@/assets/image/map/記号";
import * as 都道府県 from "@/assets/image/map/都道府県";
import * as 生き物 from "@/assets/image/map/生き物";
import * as 食べ物 from "@/assets/image/map/食べ物";
import * as 天気_季節 from "@/assets/image/map/天気_季節";
import * as 乗り物 from "@/assets/image/map/乗り物";
import * as スポーツ from "@/assets/image/map/スポーツ";
import * as その他 from "@/assets/image/map/その他";
import { atom, useAtom } from "jotai";

interface PathImages {
  [key: string]: { [key: string]: any };
}

// function that read assets/images/map folder and return filename to PathImages Object
const pathImages: PathImages = {
  記号,
  都道府県,
  生き物,
  食べ物,
  天気_季節,
  乗り物,
  スポーツ,
  その他,
};

const categoryAtom = atom<string>("記号");

export default function usePathImages() {
  const [currentCategory, setCurrentCategory] = useAtom(categoryAtom);
  return { pathImages, currentCategory, setCurrentCategory };
}
