import { Image, StyleSheet, TouchableOpacity } from "react-native";

interface GoMyLocationButtonProps {
  onPress?: () => void;
}

export default function GoMyLocationButton({ onPress }: GoMyLocationButtonProps) {
  return (
    <TouchableOpacity style={styles.currentButton} onPress={onPress}>
      <Image source={require("@/assets/image/goto-current-location.png")} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  currentButton: {
    position: "absolute",
    bottom: 64,
    right: 32,
    width: 48,
    height: 48,
    backgroundColor: "transparent",
  },
  image: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
    borderWidth: 1,
  },
});
