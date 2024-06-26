import { getUser, postUser } from "@/apis/users";
import { useAuth } from "@/hooks/useAuth";
import { GoogleSignin, isErrorWithCode, statusCodes } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { Alert, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

GoogleSignin.configure({
  iosClientId: "1049554119899-1klm3haf9m5ljnb7l1sm9j9qb6g1deq1.apps.googleusercontent.com",
});
console.log("GoogleSignin.configure");

export default function GoogleSigninButton() {
  const { replace } = useRouter();
  const { setAuth } = useAuth();

  const handleSignin = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      setAuth(userInfo);
      try {
        const res = await getUser(userInfo.user.id);
        console.log("[getUser] res", res);
        replace("/main");
      } catch (error) {
        try {
          console.log(userInfo.user.id, userInfo.user.name, userInfo.user.photo);
          const res = await postUser({
            id: userInfo.user.id,
            username: userInfo.user.name ?? "",
            profile_image: userInfo.user.photo ?? "",
          });
          console.log("[postUser] res", res);
          replace("/main");
        } catch (error) {
          alert(error);
        }
      }
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
    <TouchableOpacity onPress={() => handleSignin()} style={styles.googleSigninButton}>
      <Text style={styles.googleSigninText}>Googleでログイン</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googleSigninButton: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#11CCF1",
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  googleSigninText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
});
