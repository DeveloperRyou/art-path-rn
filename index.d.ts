interface Coordinate {
  latitude: number;
  longitude: number;
}

interface PathInfo {
  id: string;
  name: string;
  image: any;
}

interface CoupledPathInfo {
  pathLeft: PathInfo;
  pathRight?: PathInfo;
}
