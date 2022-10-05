import { polygon } from "@turf/helpers";
import intersect from "@turf/intersect";
import { LngLatBounds } from "maplibre-gl";
import { Copyright } from "../../api/tiles/models/Copyright";
import { SurfaceTile } from "../../api/tiles/models/SurfaceTile";
import { TileType } from "../../api/tiles/models/TileType";
import { MapTiles } from "../TilesSelectorControl/styles/MapTiles";

export const DEFAULT_ATTRIBUTION = "© 2022 HERE";

export const getTileType = (currentTile: MapTiles) => {
  if (
    currentTile === "satellite" ||
    currentTile === "terrain" ||
    currentTile === "traffic"
  ) {
    return TileType.RASTER;
  }

  return TileType.VECTOR;
};

export const getSurfaceTile = (currentTile: MapTiles) => {
  switch (currentTile) {
    case "satellite":
      return SurfaceTile.SATELLITE;
    case "terrain":
      return SurfaceTile.TERRAIN;
    case "traffic":
      return SurfaceTile.TRAFFIC;
    default:
      return undefined;
  }
};

export const hereCopyrightBoundsToGeojsonPositionArray = (
  hereBounds: number[]
) => {
  const geojsonPositionArray: GeoJSON.Position[] = [];

  geojsonPositionArray.push([hereBounds[1], hereBounds[2]]);
  geojsonPositionArray.push([hereBounds[1], hereBounds[0]]);
  geojsonPositionArray.push([hereBounds[3], hereBounds[0]]);
  geojsonPositionArray.push([hereBounds[3], hereBounds[2]]);
  geojsonPositionArray.push([hereBounds[1], hereBounds[2]]);

  return geojsonPositionArray;
};

export const lngLatBoundsToGeojsonPositionArray = (
  lngLatBounds: LngLatBounds
) => {
  const geojsonPositionArray: GeoJSON.Position[] = [];

  geojsonPositionArray.push([lngLatBounds._sw.lng, lngLatBounds._ne.lat]);
  geojsonPositionArray.push([lngLatBounds._sw.lng, lngLatBounds._sw.lat]);
  geojsonPositionArray.push([lngLatBounds._ne.lng, lngLatBounds._sw.lat]);
  geojsonPositionArray.push([lngLatBounds._ne.lng, lngLatBounds._ne.lat]);
  geojsonPositionArray.push([lngLatBounds._sw.lng, lngLatBounds._ne.lat]);

  return geojsonPositionArray;
};

export const getCustomAttribution = (
  bounds?: LngLatBounds,
  zoom?: number,
  copyrights?: Copyright[]
): string => {
  let attribution = "";

  if (!copyrights || !zoom || !bounds) {
    return attribution;
  }

  const geojsonBounds = lngLatBoundsToGeojsonPositionArray(bounds);
  copyrights.forEach((copyright) => {
    if (copyright.minLevel <= zoom && zoom <= copyright.maxLevel) {
      const intersectedBox =
        !copyright.boxes ||
        copyright.boxes.find((box) =>
          intersect(
            polygon([hereCopyrightBoundsToGeojsonPositionArray(box)]),
            polygon([geojsonBounds])
          )
        ) !== undefined;

      if (intersectedBox && !attribution.includes(copyright.label)) {
        attribution += `${copyright.label}, `;
        return;
      }
    }
  });

  return attribution.slice(0, -2);
};
