import { Image, StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.view}>
      <View style={styles.profile}>
        <Image source={require("assets/image/sample.png")} style={styles.profileImage} />
        <Text style={styles.profileText}>Hello, Ryou</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingVertical: 20,
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 200,
  },
  profileText: {
    fontSize: 24,
    fontWeight: "medium",
  },
});
