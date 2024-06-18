import PathButton from "@/components/button/PathButton";
import { FlatList, StyleSheet, View } from "react-native";

const paths: PathInfo[] = [
  { id: "1", name: "Path 1", imageUri: "https://via.placeholder.com/150" },
  { id: "2", name: "Path 2", imageUri: "https://via.placeholder.com/150" },
  { id: "3", name: "Path 3", imageUri: "https://via.placeholder.com/150" },
  { id: "4", name: "Path 4", imageUri: "https://via.placeholder.com/150" },
  { id: "5", name: "Path 5", imageUri: "https://via.placeholder.com/150" },
  { id: "6", name: "Path 6", imageUri: "https://via.placeholder.com/150" },
  { id: "7", name: "Path 7", imageUri: "https://via.placeholder.com/150" },
  { id: "8", name: "Path 8", imageUri: "https://via.placeholder.com/150" },
  { id: "9", name: "Path 9", imageUri: "https://via.placeholder.com/150" },
  { id: "10", name: "Path 10", imageUri: "https://via.placeholder.com/150" },
  { id: "11", name: "Path 11", imageUri: "https://via.placeholder.com/150" },
];

export default function PathList() {
  const coupledPaths: { pathLeft: PathInfo; pathRight?: PathInfo }[] = paths.reduce((acc, path, index) => {
    if (index % 2 === 0) {
      acc.push({ pathLeft: path, pathRight: paths[index + 1] });
    }
    return acc;
  }, [] as { pathLeft: PathInfo; pathRight?: PathInfo }[]);

  return (
    <View style={styles.view}>
      <FlatList
        data={coupledPaths}
        renderItem={({ item }) => (
          <View style={styles.pathView}>
            <PathButton path={item.pathLeft} />
            {item.pathRight ? <PathButton path={item.pathRight} /> : <View style={styles.pathEmptyButton} />}
          </View>
        )}
        keyExtractor={(item) => item.pathLeft.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    paddingVertical: 40,
  },
  pathView: {
    width: "100%",
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  pathEmptyButton: {
    flexBasis: "50%",
    flexShrink: 1,
  },
});
