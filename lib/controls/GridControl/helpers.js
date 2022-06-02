"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationIdToLngLat = exports.getMinGridZoom = exports.locationIdToBoundsCoordinates = exports.lineFeatureCollection = exports.lineFeature = exports.polygonFeature = exports.getFormattedCellDimensions = exports.getCell = exports.convertBoundsToGridLines = void 0;
const maplibre_gl_1 = require("maplibre-gl");
const unl_core_1 = __importDefault(require("unl-core"));
const zoomLevels_1 = __importDefault(require("../../map/zoomLevels"));
const CellPrecision_1 = __importDefault(require("./CellPrecision"));
const MAX_NUMBER_OF_LINES = 10000;
const convertBoundsToGridLines = (bounds, gridType) => {
    const unlCoreBounds = lngLatBoundsToUnlCoreBounds(extendGridBounds(bounds));
    const gridLines = unl_core_1.default.gridLines(unlCoreBounds, gridType);
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
exports.convertBoundsToGridLines = convertBoundsToGridLines;
const extendGridBounds = (bounds) => {
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
    return new maplibre_gl_1.LngLatBounds({
        lat: SWlat,
        lng: SWlng,
    }, {
        lat: NElat,
        lng: NElng,
    });
};
const lngLatBoundsToUnlCoreBounds = (lngLatBounds) => {
    return {
        n: lngLatBounds._ne.lat,
        s: lngLatBounds._sw.lat,
        e: lngLatBounds._ne.lng,
        w: lngLatBounds._sw.lng,
    };
};
const getCell = (coordinates, cellPrecision) => {
    return {
        locationId: unl_core_1.default.encode(coordinates.lat, coordinates.lng, cellPrecision),
        size: (0, exports.getFormattedCellDimensions)(cellPrecision),
    };
};
exports.getCell = getCell;
const getFormattedCellDimensions = (cellPrecision) => {
    switch (+cellPrecision) {
        case CellPrecision_1.default.GEOHASH_LENGTH_1:
            return "5,009.4km x 4,992.6km";
        case CellPrecision_1.default.GEOHASH_LENGTH_2:
            return "1,252.3km x 624.1km";
        case CellPrecision_1.default.GEOHASH_LENGTH_3:
            return "156.5km x 156km";
        case CellPrecision_1.default.GEOHASH_LENGTH_4:
            return "39.1km x 19.5km";
        case CellPrecision_1.default.GEOHASH_LENGTH_5:
            return "4.9km x 4.9km";
        case CellPrecision_1.default.GEOHASH_LENGTH_6:
            return "1.2km x 609.4m";
        case CellPrecision_1.default.GEOHASH_LENGTH_7:
            return "152.9m x 152.4m";
        case CellPrecision_1.default.GEOHASH_LENGTH_8:
            return "38.2m x 19m";
        case CellPrecision_1.default.GEOHASH_LENGTH_9:
            return "4.8m x 4.8m";
        case CellPrecision_1.default.GEOHASH_LENGTH_10:
            return "1.2m x 59.5cm";
        default:
            return "4.8m x 4.8m";
    }
};
exports.getFormattedCellDimensions = getFormattedCellDimensions;
const polygonFeature = (coordinates) => {
    return {
        type: "Feature",
        properties: {},
        geometry: {
            type: "Polygon",
            coordinates: coordinates,
        },
    };
};
exports.polygonFeature = polygonFeature;
const lineFeature = (coordinates) => {
    return {
        type: "Feature",
        properties: {},
        geometry: {
            type: "LineString",
            coordinates: coordinates,
        },
    };
};
exports.lineFeature = lineFeature;
const lineFeatureCollection = (coordinates) => {
    return {
        type: "FeatureCollection",
        features: coordinates.map((coords) => (0, exports.lineFeature)(coords)),
    };
};
exports.lineFeatureCollection = lineFeatureCollection;
const locationIdToBoundsCoordinates = (geohash) => {
    const unlCoreBounds = unl_core_1.default.bounds(geohash);
    const coordinates = [];
    coordinates.push([unlCoreBounds.w, unlCoreBounds.n]);
    coordinates.push([unlCoreBounds.w, unlCoreBounds.s]);
    coordinates.push([unlCoreBounds.e, unlCoreBounds.s]);
    coordinates.push([unlCoreBounds.e, unlCoreBounds.n]);
    coordinates.push([unlCoreBounds.w, unlCoreBounds.n]);
    return [coordinates];
};
exports.locationIdToBoundsCoordinates = locationIdToBoundsCoordinates;
const getMinGridZoom = (cellPrecision) => {
    debugger;
    switch (+cellPrecision) {
        case CellPrecision_1.default.GEOHASH_LENGTH_10:
            return zoomLevels_1.default.MIN_GRID_ZOOM_GEOHASH_LENGTH_10;
        case CellPrecision_1.default.GEOHASH_LENGTH_9:
            return zoomLevels_1.default.MIN_GRID_ZOOM_GEOHASH_LENGTH_9;
        case CellPrecision_1.default.GEOHASH_LENGTH_8:
            return zoomLevels_1.default.MIN_GRID_ZOOM_GEOHASH_LENGTH_8;
        case CellPrecision_1.default.GEOHASH_LENGTH_7:
            return zoomLevels_1.default.MIN_GRID_ZOOM_GEOHASH_LENGTH_7;
        case CellPrecision_1.default.GEOHASH_LENGTH_6:
            return zoomLevels_1.default.MIN_GRID_ZOOM_GEOHASH_LENGTH_6;
        case CellPrecision_1.default.GEOHASH_LENGTH_5:
            return zoomLevels_1.default.MIN_GRID_ZOOM_GEOHASH_LENGTH_5;
        case CellPrecision_1.default.GEOHASH_LENGTH_4:
            return zoomLevels_1.default.MIN_GRID_ZOOM_GEOHASH_LENGTH_4;
        case CellPrecision_1.default.GEOHASH_LENGTH_3:
            return zoomLevels_1.default.MIN_GRID_ZOOM_GEOHASH_LENGTH_3;
        case CellPrecision_1.default.GEOHASH_LENGTH_2:
            return zoomLevels_1.default.MIN_GRID_ZOOM_GEOHASH_LENGTH_2;
        case CellPrecision_1.default.GEOHASH_LENGTH_1:
            return zoomLevels_1.default.MIN_GRID_ZOOM_GEOHASH_LENGTH_1;
        default:
            console.log("return default");
            return zoomLevels_1.default.MIN_GRID_ZOOM_GEOHASH_LENGTH_9;
    }
};
exports.getMinGridZoom = getMinGridZoom;
const locationIdToLngLat = (locationId) => {
    const decodedGeohash = unl_core_1.default.decode(locationId);
    return new maplibre_gl_1.LngLat(decodedGeohash.lon, decodedGeohash.lat);
};
exports.locationIdToLngLat = locationIdToLngLat;
