import GoogleSigninButton from "@/components/button/GoogleSigninButton";
import { Image, StyleSheet, Text } from "react-native";

export default function Page() {
  return (
    <>
      <Image source={require("@/assets/splash.png")} style={styles.image} />
      <Text style={{ fontWeight: "900", fontSize: 56 }}>ArtPath</Text>
      <GoogleSigninButton />
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 500,
  },
});
