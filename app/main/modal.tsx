import PathCategoryPicker from "@/components/screen/PathCategoryPicker";
import PathList from "@/components/screen/PathList";
import { StyleSheet, View } from "react-native";

export default function Modal() {
  return (
    <View style={styles.view}>
      <PathCategoryPicker />
      <PathList />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    width: "100%",
    height: "100%",
  },
});
