"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ControlButton_1 = __importDefault(require("./components/ControlButton"));
const GridIcon_1 = __importDefault(require("../../icons/ts/GridIcon"));
const SelectedGridIcon_1 = __importDefault(require("../../icons/ts/SelectedGridIcon"));
const Base_1 = __importDefault(require("../Base/Base"));
const helpers_1 = require("./helpers");
const CellPrecision_1 = __importDefault(require("./CellPrecision"));
const cellPopup_1 = __importDefault(require("./cellPopup"));
const gridSelectorModal_1 = __importDefault(require("./gridSelectorModal"));
const GRID_LINES_SOURCE = "controls-grid-lines-source";
const CELL_SOURCE = "controls-cell-source";
const GRID_LINES_LAYER = "controls-grid-lines-layer";
const CELL_FILL_LAYER = "controls-cell-fill-layer";
const CELL_BORDER_LAYER = "controls-cell-border-layer";
const DEFAULT_LINES_COLOR = "#C0C0C0";
const DEFAULT_CELL_FILL_COLOR = "#FFB100";
const DEFAULT_CELL_BORDER_COLOR = "#FFB100";
const DEFAULT_WIDTH = 0.5;
const CELL_POPUP_OFFSET = {
    left: 0,
    top: 80,
};
class GridControl extends Base_1.default {
    constructor(options) {
        var _a, _b, _c, _d, _e;
        super();
        this.handlePrecisionChange = (newPrecision) => {
            this.currentPrecision = newPrecision;
            this.hideGridSelector();
            this.removeCellInfoPopup();
            this.resetCell();
            this.updateGridLines();
            const newMinGridZoom = (0, helpers_1.getMinGridZoom)(this.currentPrecision);
            console.log("newMinGridZoom", newMinGridZoom);
            this.map.setLayerZoomRange(GRID_LINES_LAYER, newMinGridZoom, 
            // this.map.getMaxZoom()
            24);
            this.map.setLayerZoomRange(CELL_BORDER_LAYER, newMinGridZoom, 
            // this.map.getMaxZoom()
            24);
            this.map.setLayerZoomRange(CELL_FILL_LAYER, newMinGridZoom, 
            // this.map.getMaxZoom()
            24);
        };
        this.insert = () => {
            this.gridButton.onClick(this.showGridSelector);
            this.addButton(this.gridButton);
            this.map.getContainer().appendChild(this.gridSelector);
            this.map.on("load", () => {
                this.showGrid();
            });
        };
        this.updateCellPopupPosition = () => {
            if (!this.cellInfoPopupNode || !this.clickedLngLat) {
                return;
            }
            if (this.map.getZoom() < (0, helpers_1.getMinGridZoom)(this.currentPrecision)) {
                this.cellInfoPopupNode.style.display = "none";
            }
            else {
                this.cellInfoPopupNode.style.display = "block";
            }
            const popupPosition = this.map.project(this.clickedLngLat);
            const canvasRect = this.map.getCanvas().getBoundingClientRect();
            this.cellInfoPopupNode.style.left = `${popupPosition.x - canvasRect.left - CELL_POPUP_OFFSET.left}px`;
            this.cellInfoPopupNode.style.top = `${popupPosition.y - canvasRect.top - CELL_POPUP_OFFSET.top}px`;
        };
        this.addCellInfoPopup = (cell) => {
            this.cellInfoPopupNode = (0, cellPopup_1.default)(cell.locationId);
            this.map.getContainer().appendChild(this.cellInfoPopupNode);
        };
        this.removeCellInfoPopup = () => {
            if (!this.cellInfoPopupNode) {
                return;
            }
            this.map.getContainer().removeChild(this.cellInfoPopupNode);
            this.cellInfoPopupNode = undefined;
        };
        this.resetCell = () => {
            const cellSource = this.map.getSource(CELL_SOURCE);
            if (cellSource) {
                cellSource.setData((0, helpers_1.polygonFeature)([]));
            }
        };
        this.handleMapClick = (e) => {
            const clickedCell = (0, helpers_1.getCell)(e.lngLat, this.currentPrecision);
            this.clickedLngLat = (0, helpers_1.locationIdToLngLat)(clickedCell.locationId);
            const cellSource = this.map.getSource(CELL_SOURCE);
            if (cellSource) {
                const coordinates = (0, helpers_1.locationIdToBoundsCoordinates)(clickedCell.locationId);
                const polygon = (0, helpers_1.polygonFeature)(coordinates);
                cellSource.setData(polygon);
            }
            this.removeCellInfoPopup();
            this.addCellInfoPopup(clickedCell);
            this.updateCellPopupPosition();
        };
        this.updateGridLines = () => {
            if (this.map.getZoom() < (0, helpers_1.getMinGridZoom)(this.currentPrecision)) {
                return;
            }
            const mapBounds = this.map.getBounds();
            const gridLinesSource = this.map.getSource(GRID_LINES_SOURCE);
            if (gridLinesSource) {
                gridLinesSource.setData((0, helpers_1.lineFeatureCollection)((0, helpers_1.convertBoundsToGridLines)(mapBounds, this.currentPrecision)));
            }
        };
        this.showGrid = () => {
            this.map.addSource(GRID_LINES_SOURCE, {
                type: "geojson",
                data: (0, helpers_1.lineFeatureCollection)([]),
            });
            this.map.addSource(CELL_SOURCE, {
                type: "geojson",
                data: (0, helpers_1.polygonFeature)([]),
            });
            this.map.addLayer({
                id: GRID_LINES_LAYER,
                type: "line",
                source: GRID_LINES_SOURCE,
                layout: {
                    "line-join": "round",
                    "line-cap": "round",
                },
                paint: {
                    "line-color": this.lineColor,
                    "line-width": this.lineWidth,
                },
                minzoom: (0, helpers_1.getMinGridZoom)(this.currentPrecision),
            });
            this.map.addLayer({
                id: CELL_FILL_LAYER,
                type: "fill",
                source: CELL_SOURCE,
                paint: {
                    "fill-color": this.cellFillColor,
                },
                minzoom: (0, helpers_1.getMinGridZoom)(this.currentPrecision),
            });
            this.map.addLayer({
                id: CELL_BORDER_LAYER,
                type: "line",
                source: CELL_SOURCE,
                paint: {
                    "line-color": this.lineColor,
                    "line-width": 1,
                },
                minzoom: (0, helpers_1.getMinGridZoom)(this.currentPrecision),
            });
            this.gridButton.setIcon((0, SelectedGridIcon_1.default)());
            this.updateGridLines();
            this.map.on("click", this.handleMapClick);
            this.map.on("move", this.updateCellPopupPosition);
            this.map.on("moveend", this.updateGridLines);
        };
        this.hideGrid = () => {
            this.gridButton.setIcon((0, GridIcon_1.default)());
            this.map.off("moveend", this.updateGridLines);
            this.map.off("move", this.updateCellPopupPosition);
            this.map.off("click", this.handleMapClick);
            this.map.removeLayer(GRID_LINES_LAYER);
            this.map.removeSource(GRID_LINES_SOURCE);
            this.map.removeLayer(CELL_FILL_LAYER);
            this.map.removeLayer(CELL_BORDER_LAYER);
            this.map.removeSource(CELL_SOURCE);
            this.removeCellInfoPopup();
        };
        this.showGridSelector = () => {
            this.gridSelector.style.display = "block";
        };
        this.hideGridSelector = () => {
            this.gridSelector.style.display = "none";
        };
        this.onAddControl = () => {
            this.insert();
        };
        this.onRemoveControl = () => {
            this.hideGrid();
        };
        this.currentPrecision =
            (_a = options === null || options === void 0 ? void 0 : options.defaultPrecision) !== null && _a !== void 0 ? _a : CellPrecision_1.default.GEOHASH_LENGTH_9;
        this.lineColor = (_b = options === null || options === void 0 ? void 0 : options.lineColor) !== null && _b !== void 0 ? _b : DEFAULT_LINES_COLOR;
        this.lineWidth = (_c = options === null || options === void 0 ? void 0 : options.lineWidth) !== null && _c !== void 0 ? _c : DEFAULT_WIDTH;
        this.cellFillColor = (_d = options === null || options === void 0 ? void 0 : options.cellFillColor) !== null && _d !== void 0 ? _d : DEFAULT_CELL_FILL_COLOR;
        this.cellBorderColor =
            (_e = options === null || options === void 0 ? void 0 : options.cellBorderColor) !== null && _e !== void 0 ? _e : DEFAULT_CELL_BORDER_COLOR;
        this.gridButton = new ControlButton_1.default().setIcon((0, GridIcon_1.default)());
        this.gridSelector = (0, gridSelectorModal_1.default)(this.currentPrecision, this.handlePrecisionChange);
    }
}
exports.default = GridControl;
