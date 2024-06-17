import GoogleSigninButton from "components/button/GoogleSigninButton";
import { Image, StyleSheet, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.view}>
      <Image source={require("assets/image/sample.png")} style={styles.image} />
      <GoogleSigninButton />
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
  image: {
    width: 300,
    height: 300,
  },
});
