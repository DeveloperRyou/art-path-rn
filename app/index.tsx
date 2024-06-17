import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  // accountName: "", // [Android] specifies an account name on the device that should be used
  iosClientId: "1049554119899-1klm3haf9m5ljnb7l1sm9j9qb6g1deq1.apps.googleusercontent.com",
});
console.log("GoogleSignin", GoogleSignin);

export default function Page() {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  // Google 로그인 처리하는 함수
  const handleSignin = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
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
    <View>
      <GoogleSigninButton />
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      <Button title="Login" onPress={() => handleSignin()} />
    </View>
  );
}
