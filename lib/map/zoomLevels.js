"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ZoomLevel;
(function (ZoomLevel) {
    ZoomLevel[ZoomLevel["MIN_ZOOM"] = 2] = "MIN_ZOOM";
    ZoomLevel[ZoomLevel["MAX_ZOOM"] = 20] = "MAX_ZOOM";
    ZoomLevel[ZoomLevel["DEFAULT_ZOOM"] = 14] = "DEFAULT_ZOOM";
    ZoomLevel[ZoomLevel["MIN_GRID_ZOOM_GEOHASH_LENGTH_10"] = 20] = "MIN_GRID_ZOOM_GEOHASH_LENGTH_10";
    ZoomLevel[ZoomLevel["MIN_GRID_ZOOM_GEOHASH_LENGTH_9"] = 18] = "MIN_GRID_ZOOM_GEOHASH_LENGTH_9";
    ZoomLevel[ZoomLevel["MIN_GRID_ZOOM_GEOHASH_LENGTH_8"] = 16] = "MIN_GRID_ZOOM_GEOHASH_LENGTH_8";
    ZoomLevel[ZoomLevel["MIN_GRID_ZOOM_GEOHASH_LENGTH_7"] = 14] = "MIN_GRID_ZOOM_GEOHASH_LENGTH_7";
    ZoomLevel[ZoomLevel["MIN_GRID_ZOOM_GEOHASH_LENGTH_6"] = 12] = "MIN_GRID_ZOOM_GEOHASH_LENGTH_6";
    ZoomLevel[ZoomLevel["MIN_GRID_ZOOM_GEOHASH_LENGTH_5"] = 10] = "MIN_GRID_ZOOM_GEOHASH_LENGTH_5";
    ZoomLevel[ZoomLevel["MIN_GRID_ZOOM_GEOHASH_LENGTH_4"] = 8] = "MIN_GRID_ZOOM_GEOHASH_LENGTH_4";
    ZoomLevel[ZoomLevel["MIN_GRID_ZOOM_GEOHASH_LENGTH_3"] = 4] = "MIN_GRID_ZOOM_GEOHASH_LENGTH_3";
    ZoomLevel[ZoomLevel["MIN_GRID_ZOOM_GEOHASH_LENGTH_2"] = 3] = "MIN_GRID_ZOOM_GEOHASH_LENGTH_2";
    ZoomLevel[ZoomLevel["MIN_GRID_ZOOM_GEOHASH_LENGTH_1"] = 2] = "MIN_GRID_ZOOM_GEOHASH_LENGTH_1";
})(ZoomLevel || (ZoomLevel = {}));
exports.default = ZoomLevel;
