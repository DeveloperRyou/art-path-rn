import RoundButton from "@/components/button/RoundButton";
import PathCategoryPicker from "@/components/screen/PathCategoryPicker";
import PathList from "@/components/screen/PathList";
import { StyleSheet, View } from "react-native";

export default function Modal() {
  return (
    <View style={styles.view}>
      <PathCategoryPicker />
      <PathList />
      <RoundButton text="ランダムに選ぶ" type="outline" buttonColor="#000000" textColor="#000000" />
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
