function calculateDirection(currentLocation: Coordinate, nextLocation: Coordinate, nextNextLocation: Coordinate) {
  const vector = {
    x: nextLocation.longitude - currentLocation.longitude,
    y: nextLocation.latitude - currentLocation.latitude,
  };
  const vectorWithLength = Math.sqrt(vector.x ** 2 + vector.y ** 2);
  const unitVector = {
    x: vector.x / vectorWithLength,
    y: vector.y / vectorWithLength,
  };
  const nextVector = {
    x: nextNextLocation.longitude - nextLocation.longitude,
    y: nextNextLocation.latitude - nextLocation.latitude,
  };
  const nextVectorWithLength = Math.sqrt(nextVector.x ** 2 + nextVector.y ** 2);
  const nextUnitVector = {
    x: nextVector.x / nextVectorWithLength,
    y: nextVector.y / nextVectorWithLength,
  };

  const crossProduct = unitVector.x * nextUnitVector.y - unitVector.y * nextUnitVector.x;
  const direction: "straight" | "right" | "left" =
    crossProduct > -0.5 ? (crossProduct > 0.5 ? "left" : "straight") : "right";
  return direction;
}

function calculateDistance(currentLocation: Coordinate, nextLocation: Coordinate) {
  if (!currentLocation || !nextLocation) {
    return 0;
  }
  const vector = {
    x: nextLocation.longitude - currentLocation.longitude,
    y: nextLocation.latitude - currentLocation.latitude,
  };
  return Math.sqrt((vector.x * 88.9) ** 2 + (vector.y * 111.3) ** 2);
}

export { calculateDirection, calculateDistance };
