import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PathButton({ path }: { path: PathInfo }) {
  const { navigate } = useRouter();
  const [height, setHeight] = useState(0);
  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setHeight(width);
  };
  return (
    <TouchableOpacity
      style={{ ...styles.pathButton, height }}
      onPress={() =>
        navigate({
          pathname: "/path",
          params: {
            id: path.id,
          },
        })
      }
      onLayout={onLayout}
    >
      <Image style={styles.pathImage} source={{ uri: path.imageUri }} />
      <View style={styles.pathTextContainer}>
        <Text style={styles.pathText}>{path.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pathButton: {
    position: "relative",
    alignItems: "center",
    flexBasis: "50%",
    flexShrink: 1,
  },
  pathTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pathText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  pathImage: {
    borderRadius: 4,
    width: "100%",
    height: "100%",
  },
});
