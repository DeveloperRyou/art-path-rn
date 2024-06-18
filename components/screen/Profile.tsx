import { useAuth } from "@/hooks/useAuth";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const { auth } = useAuth();
  return (
    <View style={styles.profile}>
      <Image source={{ uri: auth?.user.photo as string }} style={styles.profileImage} />
      <View style={styles.profileTextContainer}>
        <Text style={styles.profileText}>Hello,</Text>
        <Text style={styles.profileTextBold}>{auth?.user.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 200,
  },
  profileTextContainer: {},
  profileText: {
    textAlign: "right",
    fontSize: 22,
    fontWeight: "regular",
  },
  profileTextBold: {
    textAlign: "right",
    fontSize: 24,
    fontWeight: "bold",
  },
});
