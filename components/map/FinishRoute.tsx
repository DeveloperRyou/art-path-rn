import RoundButton from "@/components/button/RoundButton";
import useRouting from "@/hooks/useRouting";
import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function FinishRoute() {
  const { push } = useRouter();
  const { setIsScreenShot } = useRouting();
  return (
    <View style={styles.view}>
      <Image style={styles.image} source={require("@/assets/image/navigation/finish.png")} />
      <RoundButton
        text="Goto MainPage"
        buttonColor="#101010"
        onPress={() => {
          push("/main");
        }}
      />
      <RoundButton
        text="スクリーンショットをする"
        buttonColor="#ffffff"
        textColor="#000000"
        type="outline"
        onPress={() => {
          setIsScreenShot(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    padding: 20,
    gap: 20,
    top: 0,
    left: 0,
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  image: {
    width: 200,
    height: 200,
  },
});
