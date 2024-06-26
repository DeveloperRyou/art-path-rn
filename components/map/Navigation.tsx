import { calculateDirection, calculateDistance } from "@/components/map/calculate";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import useRouting from "@/hooks/useRouting";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const navigaetionImageDictionary = {
  straight: require("@/assets/image/navigation/straight.png"),
  right: require("@/assets/image/navigation/right.png"),
  left: require("@/assets/image/navigation/left.png"),
};

export default function Navigation() {
  const { route, routeIndex, setRouteIndex } = useRouting();
  const { currentLocation } = useCurrentLocation();
  const [distance, setDistance] = useState<number>(0);
  const [direction, setDirection] = useState<"straight" | "right" | "left">("straight");

  useEffect(() => {
    if (!route || route.length < 2) {
      return;
    }
    if (routeIndex >= route.length) {
      return;
    }
    const dis = calculateDistance(currentLocation as Coordinate, route[routeIndex + 1]);
    const disRounded = Math.round(dis * 100) / 100;
    setDistance(disRounded);
    if (disRounded < 0.1 && routeIndex < route.length) {
      setRouteIndex((prev) => prev + 1);
      return;
    }

    if (routeIndex + 2 >= route.length) {
      const dir = calculateDirection(route[routeIndex], route[routeIndex + 1], route[routeIndex + 2]);
      setDirection(dir);
    } else {
      setDirection("straight");
    }
  }, [route, currentLocation, routeIndex]);

  return (
    <View style={styles.view}>
      <View style={styles.controlView}>
        <Text style={{ fontSize: 16 }}>
          {routeIndex + 1} / {route?.length}
        </Text>
        <TouchableOpacity
          style={styles.tempButton}
          onPress={() => {
            setRouteIndex((prev) => prev + 1);
          }}
        >
          <Text>Skip This Route</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tempButton}
          onPress={() => {
            setRouteIndex(route.length);
          }}
        >
          <Text>Finish</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerView}>
        <Image style={styles.navigationImage} source={navigaetionImageDictionary[direction]} />
        <View style={{ gap: 4, alignItems: "flex-end" }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{distance}km</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {direction == "straight" ? "直進" : direction == "left" ? "左折" : "右折"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    top: 80,
    padding: 20,
    width: "100%",
    height: 140,
    flex: 1,
    gap: 20,
  },
  innerView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  navigationImage: {
    width: 100,
    height: 100,
  },
  controlView: {
    width: "100%",
    height: 60,
    backgroundColor: "transparent",
    borderRadius: 8,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  tempButton: {
    borderRadius: 8,
    padding: 10,
  },
});
