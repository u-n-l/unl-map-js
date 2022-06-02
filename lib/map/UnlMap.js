"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const maplibre_gl_1 = require("maplibre-gl");
const controls_1 = require("../controls");
const here_1 = require("./styles/here");
const zoomLevels_1 = __importDefault(require("./zoomLevels"));
const DEFAULT_GRID_CONTROL_POSITION = "top-right";
class UnlMap extends maplibre_gl_1.Map {
    constructor(options) {
        var _a, _b, _c;
        super(Object.assign(Object.assign({}, options), { style: (0, here_1.getStyle)(options.apiKey), minZoom: (_a = options.minZoom) !== null && _a !== void 0 ? _a : zoomLevels_1.default.MIN_ZOOM, maxZoom: (_b = options.maxZoom) !== null && _b !== void 0 ? _b : zoomLevels_1.default.MAX_ZOOM, maplibreLogo: false, logoPosition: undefined }));
        if (options.gridControl) {
            this.addControl(new controls_1.GridControl(), (_c = options.gridControlPosition) !== null && _c !== void 0 ? _c : DEFAULT_GRID_CONTROL_POSITION);
        }
    }
}
exports.default = UnlMap;
