import { calculateDirection, calculateDistance } from "@/components/map/calculate";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NavigationProps {
  route?: Coordinate[];
  callbackFinishNavigation?: () => void;
}

const navigaetionImageDictionary = {
  straight: require("@/assets/image/navigation/straight.png"),
  right: require("@/assets/image/navigation/right.png"),
  left: require("@/assets/image/navigation/left.png"),
};

export default function Navigation({ route, callbackFinishNavigation }: NavigationProps) {
  const [currentRouteIndex, setCurrentRouteIndex] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [direction, setDirection] = useState<"straight" | "right" | "left">("straight");
  const { currentLocation } = useCurrentLocation();

  useEffect(() => {
    if (!route || route.length < 2) {
      return;
    }
    if (currentRouteIndex === route.length - 2 || currentRouteIndex === route.length - 3) {
      setDirection("straight");
      const distance = calculateDistance(currentLocation as Coordinate, route[currentRouteIndex + 1]);
      setDistance(Math.round(distance * 100) / 100);
      return;
    }
    const direction = calculateDirection(
      route[currentRouteIndex],
      route[currentRouteIndex + 1],
      route[currentRouteIndex + 2]
    );
    const distance = calculateDistance(currentLocation as Coordinate, route[currentRouteIndex + 1]);
    setDirection(direction);
    setDistance(Math.round(distance * 100) / 100);
  }, [route, currentLocation, currentRouteIndex]);

  useEffect(() => {
    console.log("distance", distance);
    if (distance < 0.1) {
      if (route && currentRouteIndex === route.length - 2) {
        callbackFinishNavigation?.();
        return;
      }
      setCurrentRouteIndex((prev) => prev + 1);
    }
  }, [distance]);

  return (
    <View style={styles.view}>
      <View style={styles.innerView}>
        <Image style={styles.navigationImage} source={navigaetionImageDictionary[direction]} />
        <View style={{ gap: 4, alignItems: "flex-end" }}>
          <Text style={{ fontSize: 16 }}>
            {currentRouteIndex + 1} / {route?.length}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{distance}km</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {direction == "straight" ? "直進" : direction == "left" ? "左折" : "右折"}
          </Text>
        </View>
      </View>
      <View style={styles.tempRouteView}>
        <TouchableOpacity
          style={styles.tempButton}
          onPress={() => {
            setCurrentRouteIndex((prev) => (prev + 1 < route?.length - 1 ? prev + 1 : prev));
          }}
        >
          <Text>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tempButton}
          onPress={() => {
            callbackFinishNavigation?.();
          }}
        >
          <Text>finish route</Text>
        </TouchableOpacity>
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
  tempRouteView: {
    width: "100%",
    height: 60,
    marginTop: 20,
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
