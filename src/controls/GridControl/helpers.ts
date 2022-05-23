import { LngLat, LngLatBounds } from "maplibre-gl";
import UnlCore from "unl-core";
import ZoomLevel from "../../map/zoomLevels";
import Cell from "./Cell";
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

export const getCell = (
  coordinates: LngLat,
  cellPrecision: CellPrecision
): Cell => {
  return {
    locationId: UnlCore.encode(coordinates.lng, coordinates.lat, cellPrecision),
    size: getFormattedCellDimensions(cellPrecision),
  };
};

export const getFormattedCellDimensions = (cellPrecision: CellPrecision) => {
  switch (cellPrecision) {
    case CellPrecision.GEOHASH_LENGTH_1:
      return "5,009.4km x 4,992.6km";
    case CellPrecision.GEOHASH_LENGTH_2:
      return "1,252.3km x 624.1km";
    case CellPrecision.GEOHASH_LENGTH_3:
      return "156.5km x 156km";
    case CellPrecision.GEOHASH_LENGTH_4:
      return "39.1km x 19.5km";
    case CellPrecision.GEOHASH_LENGTH_5:
      return "4.9km x 4.9km";
    case CellPrecision.GEOHASH_LENGTH_6:
      return "1.2km x 609.4m";
    case CellPrecision.GEOHASH_LENGTH_7:
      return "152.9m x 152.4m";
    case CellPrecision.GEOHASH_LENGTH_8:
      return "38.2m x 19m";
    case CellPrecision.GEOHASH_LENGTH_9:
      return "4.8m x 4.8m";
    case CellPrecision.GEOHASH_LENGTH_10:
      return "1.2m x 59.5cm";
    default:
      return "1.2m x 59.5cm";
  }
};

export const polygonFeature = (
  coordinates: GeoJSON.Position[][]
): GeoJSON.Feature => {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: coordinates,
    },
  };
};

export const lineFeature = (
  coordinates: GeoJSON.Position[]
): GeoJSON.Feature => {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coordinates,
    },
  };
};

export const lineFeatureCollection = (
  coordinates: GeoJSON.Position[][]
): GeoJSON.FeatureCollection => {
  return {
    type: "FeatureCollection",
    features: coordinates.map((coords: GeoJSON.Position[]) =>
      lineFeature(coords)
    ),
  };
};

export const locationIdToBoundsCoordinates = (
  geohash: string
): GeoJSON.Position[][] => {
  const unlCoreBounds: UnlCore.Bounds = UnlCore.bounds(geohash);
  const coordinates = [];

  coordinates.push([unlCoreBounds.n, unlCoreBounds.w]);
  coordinates.push([unlCoreBounds.s, unlCoreBounds.w]);
  coordinates.push([unlCoreBounds.s, unlCoreBounds.e]);
  coordinates.push([unlCoreBounds.n, unlCoreBounds.e]);
  coordinates.push([unlCoreBounds.n, unlCoreBounds.w]);

  return [coordinates];
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
