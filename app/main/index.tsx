import RoundButton from "@/components/button/RoundButton";
import PathList from "@/components/screen/PathList";
import Profile from "@/components/screen/Profile";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Home() {
  const { push } = useRouter();
  return (
    <View style={styles.view}>
      <Profile />
      <PathList />
      <RoundButton text="next" onPress={() => push("/main/modal")} />
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
