import usePathImages from "@/hooks/usePathImages";
import { PickerIOS } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

export default function PathCategoryPicker() {
  const { pathImages, currentCategory, setCurrentCategory } = usePathImages();
  return (
    <PickerIOS
      style={styles.picker}
      itemStyle={styles.pickerItem}
      selectedValue={currentCategory}
      onValueChange={(itemValue) => setCurrentCategory(itemValue.toString())}
    >
      {Object.keys(pathImages).map((category) => (
        <PickerIOS.Item key={category} label={category} value={category} />
      ))}
    </PickerIOS>
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
  picker: {
    width: "100%",
    marginTop: -100,
  },
  pickerItem: { color: "#000000" },
});
