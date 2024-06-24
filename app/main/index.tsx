import RoundButton from "@/components/button/RoundButton";
import HistoryList from "@/components/screen/HistoryList";
import Profile from "@/components/screen/Profile";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Home() {
  const { push } = useRouter();
  return (
    <View style={styles.view}>
      <Profile />
      <HistoryList />
      <RoundButton text="散歩を始める" onPress={() => push("/main/modal")} />
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
