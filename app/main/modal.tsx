import RoundButton from "@/components/button/RoundButton";
import PathCategoryPicker from "@/components/screen/PathCategoryPicker";
import PathList from "@/components/screen/PathList";
import usePathImages from "@/hooks/usePathImages";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Modal() {
  const { navigate } = useRouter();
  const { pathImages } = usePathImages();
  const pickRandomPathId = (): string => {
    const categoryList = Object.keys(pathImages);
    const randomCategory = categoryList[Math.floor(Math.random() * categoryList.length)];
    const randomPathList = Object.values(pathImages[randomCategory]);
    const randomPath = randomPathList[Math.floor(Math.random() * randomPathList.length)];
    return randomPath.id;
  };
  return (
    <View style={styles.view}>
      <PathCategoryPicker />
      <PathList />
      <RoundButton
        text="ランダムに選ぶ"
        type="outline"
        buttonColor="#000000"
        textColor="#000000"
        onPress={() => {
          const id = pickRandomPathId();
          navigate({
            pathname: `/path/${id}`,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 40,
    width: "100%",
    height: "100%",
  },
});
