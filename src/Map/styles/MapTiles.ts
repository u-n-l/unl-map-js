import vectorialTiles from "./mapstyles_vectorial.json";
import satelliteTiles from "./mapstyles_satellite.json";
import terrainTiles from "./mapstyles_terrain.json";
import trafficTiles from "./mapstyles_traffic.json";
import baseTiles from "./mapstyles_base.json";

export type MapTiles =
  | "vectorial"
  | "satellite"
  | "terrain"
  | "traffic"
  | "base";

export const getStyle = (style?: MapTiles) => {
  switch (style) {
    case "vectorial":
      return vectorialTiles;
    case "satellite":
      return satelliteTiles;
    case "terrain":
      return terrainTiles;
    case "traffic":
      return trafficTiles;
    case "base":
      return baseTiles;
    default:
      return vectorialTiles;
  }
};
