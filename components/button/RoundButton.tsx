import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface RoundButtonProps {
  onPress?: () => void;
  text: string;
}

export default function RoundButton({ onPress, text }: RoundButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.roundButton}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#06C755",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
