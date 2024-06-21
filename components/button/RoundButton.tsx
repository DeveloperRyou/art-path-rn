import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface RoundButtonProps {
  type?: "fill" | "outline";
  buttonColor?: string;
  textColor?: string;
  onPress?: () => void;
  text: string;
}

export default function RoundButton({
  type = "fill",
  buttonColor = "#06C755",
  textColor = "#ffffff",
  onPress,
  text,
}: RoundButtonProps) {
  switch (type) {
    case "fill":
      return (
        <TouchableOpacity onPress={onPress} style={{ ...styles.roundButton, backgroundColor: buttonColor }}>
          <Text style={{ ...styles.buttonText, color: textColor }}>{text}</Text>
        </TouchableOpacity>
      );
    case "outline":
      return (
        <TouchableOpacity
          onPress={onPress}
          style={{
            ...styles.roundButton,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: buttonColor,
          }}
        >
          <Text style={{ ...styles.buttonText, color: textColor }}>{text}</Text>
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  roundButton: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
