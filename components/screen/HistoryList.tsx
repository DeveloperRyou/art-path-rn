import PathButton from "@/components/button/PathButton";
import usePathHistorys from "@/hooks/usePathHistorys";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function HistoryList() {
  const { pathHistorys } = usePathHistorys();
  const [coupledPaths, setCoupledPaths] = useState<{ pathLeft: PathInfo; pathRight?: PathInfo }[]>([]);

  useEffect(() => {
    const newCoupledPaths: { pathLeft: PathInfo; pathRight?: PathInfo }[] = pathHistorys.reduce((acc, path, index) => {
      if (index % 2 === 0) {
        acc.push({ pathLeft: path, pathRight: pathHistorys[index + 1] });
      }
      return acc;
    }, [] as { pathLeft: PathInfo; pathRight?: PathInfo }[]);
    setCoupledPaths(newCoupledPaths);
  }, [pathHistorys]);

  return (
    <View style={styles.view}>
      {pathHistorys.length === 0 ? (
        <Text style={styles.emptyPathText}>散歩を始めてみましょうか？</Text>
      ) : (
        <FlatList
          data={coupledPaths}
          renderItem={({ item }) => (
            <View style={styles.pathView}>
              <PathButton path={item.pathLeft} display={false} />
              {item.pathRight ? (
                <PathButton path={item.pathRight} display={false} />
              ) : (
                <View style={styles.pathEmptyButton} />
              )}
            </View>
          )}
          keyExtractor={(item) => item.pathLeft.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
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
  emptyPathText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: "auto",
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
