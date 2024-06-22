import { StyleSheet, View } from "react-native";

interface NavigationProps {
  route: Coordinate[];
}

export default function Navigation({ route }: NavigationProps) {
  return <View style={styles.view}></View>;
}

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    top: 80,
    padding: 20,
    width: "100%",
    height: 100,
    backgroundColor: "#000",
    flex: 1,
  },
});
