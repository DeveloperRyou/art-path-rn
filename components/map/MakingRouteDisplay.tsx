import RoundButton from "@/components/button/RoundButton";
import useRouting from "@/hooks/useRouting";
import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function MakingRouteDisplay({ startRoute }: { startRoute: () => void }) {
  const { route, remakeRoute } = useRouting();
  const { push } = useRouter();
  return (
    <View style={styles.view}>
      <View style={styles.innerView}>
        <View style={{ gap: 16, flexDirection: "row", alignContent: "center", alignItems: "center" }}>
          {route.length > 0 ? (
            <Text style={{ color: "#fff", fontSize: 20 }}>作成 {route.length} 点</Text>
          ) : (
            <>
              <Text style={{ color: "#fff", fontSize: 20 }}>ルートを作成中...</Text>
              <ActivityIndicator size="large" color="#06C755" />
            </>
          )}
        </View>
        <View style={{ gap: 16, flexDirection: "column", width: "100%" }}>
          {route.length > 0 ? (
            <>
              <RoundButton text="Start" onPress={() => startRoute()} />
              <RoundButton text="作り直し" type="outline" buttonColor="#fff" onPress={() => remakeRoute()} />
            </>
          ) : (
            <RoundButton text="Go Back" type="outline" buttonColor="#fff" onPress={() => push("/main")} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    top: 0,
    padding: 20,
    width: "100%",
    height: "100%",
    backgroundColor: "#00000088",
    flex: 1,
  },
  innerView: {
    width: "100%",
    height: "100%",
    paddingVertical: 60,
    gap: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
