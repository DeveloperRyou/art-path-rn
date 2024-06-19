import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function Modal() {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>コースを選ぶ</Text>
      <Link href="../">Dismiss</Link>
      <StatusBar style="light" />
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
  text: {
    fontSize: 32,
    width: "100%",
    fontWeight: "bold",
    color: "#000000",
    textAlign: "left",
  },
});
