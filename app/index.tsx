import { GoogleSignin, isErrorWithCode, statusCodes } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { useAuth } from "hooks/useAuth";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

GoogleSignin.configure({
  iosClientId: "1049554119899-1klm3haf9m5ljnb7l1sm9j9qb6g1deq1.apps.googleusercontent.com",
});
console.log("GoogleSignin.configure");

export default function Page() {
  const { replace } = useRouter();
  const { setAuth } = useAuth();

  // Google 로그인 처리하는 함수
  const handleSignin = async () => {
    try {
      //const userInfo = await GoogleSignin.signIn();
      //setAuth(userInfo);
      replace("/home");
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            Alert.alert("User cancelled the login flow");
            break;
          case statusCodes.IN_PROGRESS:
            Alert.alert("Error encountered while signing in");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert("Play services not available or outdated");
            break;
          default:
        }
      }
    }
  };

  return (
    <View style={styles.view}>
      <Image source={require("assets/image/sample.png")} style={styles.image} />
      <TouchableOpacity onPress={() => handleSignin()} style={styles.googleSigninButton}>
        <Image source={require("assets/icon/google.png")} style={styles.googleIcon} />
        <Text style={styles.googleSigninText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 20,
    paddingBottom: 20,
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  googleSigninButton: {
    flexDirection: "row",
    width: 300,
    height: 50,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "white",
    borderColor: "#747775",
    borderWidth: 0.5,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  googleSigninText: {
    fontSize: 16,
    fontWeight: "medium",
    color: "#1F1F1F",
  },
});
