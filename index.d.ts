interface Coordinate {
  latitude: number;
  longitude: number;
}

interface PathInfo {
  genre: string;
  id: string;
  name: string;
  original_image: string;
}

interface CoupledPathInfo {
  pathLeft: PathInfo;
  pathRight?: PathInfo;
}
