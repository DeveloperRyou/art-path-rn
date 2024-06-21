import PathCategoryPicker from "@/components/screen/PathCategoryPicker";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function Modal() {
  return (
    <View style={styles.view}>
      <PathCategoryPicker />
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
  picker: {
    width: "100%",
    marginTop: -100,
  },
  pickerItem: { color: "#000000" },
});
