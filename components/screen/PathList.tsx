import PathButton from "@/components/button/PathButton";
import usePathImages from "@/hooks/usePathImages";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function PathList() {
  const { pathImages, currentCategory } = usePathImages();
  const [coupledPaths, setCoupledPaths] = useState<{ pathLeft: PathInfo; pathRight?: PathInfo }[]>([]);

  useEffect(() => {
    if (!pathImages[currentCategory]) return;
    const paths: PathInfo[] = Object.keys(pathImages[currentCategory]).map((key) => ({
      id: key,
      name: key,
      image: pathImages[currentCategory][key],
    }));
    const newCoupledPaths: { pathLeft: PathInfo; pathRight?: PathInfo }[] = paths.reduce((acc, path, index) => {
      if (index % 2 === 0) {
        acc.push({ pathLeft: path, pathRight: paths[index + 1] });
      }
      return acc;
    }, [] as { pathLeft: PathInfo; pathRight?: PathInfo }[]);
    setCoupledPaths(newCoupledPaths);
  }, [currentCategory]);

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
    flexGrow: 1,
    flexShrink: 1,
    paddingVertical: 20,
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
