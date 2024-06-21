import * as 記号 from "@/assets/image/map/記号";
import * as 都道府県 from "@/assets/image/map/都道府県";
import * as 生き物 from "@/assets/image/map/生き物";
import * as 食べ物 from "@/assets/image/map/食べ物";
import * as 天気_季節 from "@/assets/image/map/天気_季節";
import * as 乗り物 from "@/assets/image/map/乗り物";
import * as スポーツ from "@/assets/image/map/スポーツ";
import * as その他 from "@/assets/image/map/その他";

interface PathImages {
  [key: string]: string[];
}

// function that read assets/images/map folder and return filename to PathImages Object
export const pathImages: PathImages = {
  記号: Object.keys(記号),
  都道府県: Object.keys(都道府県),
  生き物: Object.keys(生き物),
  食べ物: Object.keys(食べ物),
  天気_季節: Object.keys(天気_季節),
  乗り物: Object.keys(乗り物),
  スポーツ: Object.keys(スポーツ),
  その他: Object.keys(その他),
};

export default function usePathImages() {
  return { pathImages };
}
