import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function MainLayout() {
  return (
    <View style={styles.view}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingVertical: 80,
    paddingHorizontal: 20,
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
