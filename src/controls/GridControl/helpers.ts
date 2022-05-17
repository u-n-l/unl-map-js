import { LngLatBounds } from "maplibre-gl";
import UnlCore from "unl-core";
import ZoomLevel from "../../map/zoomLevels";
import CellPrecision from "./CellPrecision";

const MAX_NUMBER_OF_LINES = 10000;

export const convertBoundsToGridLines = (
  bounds: LngLatBounds,
  gridType: CellPrecision
) => {
  const unlCoreBounds = lngLatBoundsToUnlCoreBounds(extendGridBounds(bounds));
  const gridLines = UnlCore.gridLines(unlCoreBounds, gridType);

  const lonMin = unlCoreBounds.w;
  const lonMax = unlCoreBounds.e;
  const latMin = unlCoreBounds.s;
  const latMax = unlCoreBounds.n;

  if (lonMax === 179.99 || lonMin === -179.99) {
    gridLines.push([
      [179.99, latMin],
      [179.99, latMax],
    ]);
  }

  if (gridLines.length > MAX_NUMBER_OF_LINES) {
    return [];
  }

  return gridLines;
};

const extendGridBounds = (bounds: LngLatBounds) => {
  const mapBoundsWidth = Math.abs(bounds._ne.lng - bounds._sw.lng);
  const mapBoundsHeight = Math.abs(bounds._ne.lat - bounds._sw.lat);

  let SWlat = bounds._sw.lat - mapBoundsHeight;
  let SWlng = bounds._sw.lng - mapBoundsWidth;
  let NElat = bounds._ne.lat + mapBoundsHeight;
  let NElng = bounds._ne.lng + mapBoundsWidth;

  if (SWlat <= -90) {
    SWlat = -89.99;
  }
  if (SWlng <= -180) {
    SWlng = -179.99;
  }
  if (NElat >= 90) {
    NElat = 89.99;
  }
  if (NElng >= 180) {
    NElng = 179.99;
  }

  return new LngLatBounds(
    {
      lat: SWlat,
      lng: SWlng,
    },
    {
      lat: NElat,
      lng: NElng,
    }
  );
};

const lngLatBoundsToUnlCoreBounds = (
  lngLatBounds: LngLatBounds
): UnlCore.Bounds => {
  return {
    n: lngLatBounds._ne.lat,
    s: lngLatBounds._sw.lat,
    e: lngLatBounds._ne.lng,
    w: lngLatBounds._sw.lng,
  };
};

export const lineFeatureCollection = (
  coordinates: GeoJSON.Position[][]
): GeoJSON.FeatureCollection => {
  return {
    type: "FeatureCollection",
    features: coordinates.map((coords: GeoJSON.Position[]) => ({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: coords,
      },
    })),
  };
};

export const getMinGridZoom = (cellPrecision: CellPrecision) => {
  switch (cellPrecision) {
    case CellPrecision.GEOHASH_LENGTH_10:
      return ZoomLevel.MIN_GRID_ZOOM_GEOHASH_LENGTH_10;
    case CellPrecision.GEOHASH_LENGTH_9:
      return ZoomLevel.MIN_GRID_ZOOM_GEOHASH_LENGTH_9;
    case CellPrecision.GEOHASH_LENGTH_8:
      return ZoomLevel.MIN_GRID_ZOOM_GEOHASH_LENGTH_8;
    case CellPrecision.GEOHASH_LENGTH_7:
      return ZoomLevel.MIN_GRID_ZOOM_GEOHASH_LENGTH_7;
    case CellPrecision.GEOHASH_LENGTH_6:
      return ZoomLevel.MIN_GRID_ZOOM_GEOHASH_LENGTH_6;
    case CellPrecision.GEOHASH_LENGTH_5:
      return ZoomLevel.MIN_GRID_ZOOM_GEOHASH_LENGTH_5;
    case CellPrecision.GEOHASH_LENGTH_4:
      return ZoomLevel.MIN_GRID_ZOOM_GEOHASH_LENGTH_4;
    case CellPrecision.GEOHASH_LENGTH_3:
      return ZoomLevel.MIN_GRID_ZOOM_GEOHASH_LENGTH_3;
    case CellPrecision.GEOHASH_LENGTH_2:
      return ZoomLevel.MIN_GRID_ZOOM_GEOHASH_LENGTH_2;
    case CellPrecision.GEOHASH_LENGTH_1:
      return ZoomLevel.MIN_GRID_ZOOM_GEOHASH_LENGTH_1;
    default:
      return ZoomLevel.MIN_GRID_ZOOM_GEOHASH_LENGTH_9;
  }
};
