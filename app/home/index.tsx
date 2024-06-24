import GoogleSigninButton from "@/components/button/GoogleSigninButton";
import { Image, StyleSheet } from "react-native";

export default function Page() {
  return (
    <>
      <Image source={require("@/assets/splash.png")} style={styles.image} />
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
