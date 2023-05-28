import { MapTiles } from "./styles/MapTiles";

export const isVectorialIncluded = (mapTiles: MapTiles[]) => {
  return (
    mapTiles.includes("rich") ||
    mapTiles.includes("vectorial") ||
    mapTiles.includes("base")
  );
};
