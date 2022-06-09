import { LngLat, MapMouseEvent } from "maplibre-gl";
import ControlButton from "./components/ControlButton";
import gridIcon from "../../icons/ts/GridIcon";
import selectedGridIcon from "../../icons/ts/SelectedGridIcon";
import Base from "../Base/Base";
import {
  convertBoundsToGridLines,
  getCell,
  getMinGridZoom,
  lineFeatureCollection,
  locationIdToBoundsCoordinates,
  locationIdToLngLat,
  polygonFeature,
} from "./helpers";
import CellPrecision from "./CellPrecision";
import Cell from "./Cell";
import cellInfoPopupTemplate from "./cellPopup";
import gridSelectorModal from "./gridSelectorModal";

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

export interface GridControlOptions {
  defaultPrecision?: CellPrecision;
  lineColor?: string;
  lineWidth?: number;
  cellFillColor?: string;
  cellBorderColor?: string;
}

export default class GridControl extends Base {
  gridButton: ControlButton;
  currentPrecision: CellPrecision;
  lineColor: string;
  lineWidth: number;
  cellFillColor: string;
  cellBorderColor: string;
  gridSelector: HTMLDivElement;
  cellInfoPopupNode?: HTMLDivElement;
  clickedLngLat?: LngLat;

  constructor(options?: GridControlOptions) {
    super();

    this.currentPrecision =
      options?.defaultPrecision ?? CellPrecision.GEOHASH_LENGTH_9;
    this.lineColor = options?.lineColor ?? DEFAULT_LINES_COLOR;
    this.lineWidth = options?.lineWidth ?? DEFAULT_WIDTH;
    this.cellFillColor = options?.cellFillColor ?? DEFAULT_CELL_FILL_COLOR;
    this.cellBorderColor =
      options?.cellBorderColor ?? DEFAULT_CELL_BORDER_COLOR;

    this.gridButton = new ControlButton().setIcon(gridIcon());
    this.gridSelector = gridSelectorModal(
      this.currentPrecision,
      this.handlePrecisionChange
    );
  }

  handlePrecisionChange = (newPrecision: CellPrecision) => {
    this.currentPrecision = newPrecision;

    this.hideGridSelector();
    this.removeCellInfoPopup();
    this.resetCell();

    this.updateGridLines();
    const newMinGridZoom = getMinGridZoom(this.currentPrecision);
    console.log("newMinGridZoom", newMinGridZoom);
    this.map.setLayerZoomRange(GRID_LINES_LAYER, newMinGridZoom, 24);
    this.map.setLayerZoomRange(CELL_BORDER_LAYER, newMinGridZoom, 24);
    this.map.setLayerZoomRange(CELL_FILL_LAYER, newMinGridZoom, 24);
  };

  insert = () => {
    this.gridButton.onClick(this.showGridSelector);
    this.addButton(this.gridButton);
    this.map.getContainer().appendChild(this.gridSelector);
    this.map.on("styledata", this.addLayersAndSources);
    this.showGrid();
  };

  updateCellPopupPosition = () => {
    if (!this.cellInfoPopupNode || !this.clickedLngLat) {
      return;
    }

    if (this.map.getZoom() < getMinGridZoom(this.currentPrecision)) {
      this.cellInfoPopupNode.style.display = "none";
    } else {
      this.cellInfoPopupNode.style.display = "block";
    }

    const popupPosition = this.map.project(this.clickedLngLat);
    const canvasRect = this.map.getCanvas().getBoundingClientRect();

    this.cellInfoPopupNode.style.left = `${
      popupPosition.x - canvasRect.left - CELL_POPUP_OFFSET.left
    }px`;
    this.cellInfoPopupNode.style.top = `${
      popupPosition.y - canvasRect.top - CELL_POPUP_OFFSET.top
    }px`;
  };

  addCellInfoPopup = (cell: Cell) => {
    this.cellInfoPopupNode = cellInfoPopupTemplate(cell.locationId);

    this.map.getContainer().appendChild(this.cellInfoPopupNode);
  };

  removeCellInfoPopup = () => {
    if (!this.cellInfoPopupNode) {
      return;
    }

    this.map.getContainer().removeChild(this.cellInfoPopupNode!);
    this.cellInfoPopupNode = undefined;
  };

  resetCell = () => {
    const cellSource: maplibregl.GeoJSONSource = this.map.getSource(
      CELL_SOURCE
    ) as maplibregl.GeoJSONSource;

    if (cellSource) {
      cellSource.setData(polygonFeature([]));
    }
  };

  handleMapClick = (e: MapMouseEvent) => {
    const clickedCell = getCell(e.lngLat, this.currentPrecision);
    this.clickedLngLat = locationIdToLngLat(clickedCell.locationId);

    const cellSource: maplibregl.GeoJSONSource = this.map.getSource(
      CELL_SOURCE
    ) as maplibregl.GeoJSONSource;

    if (cellSource) {
      const coordinates = locationIdToBoundsCoordinates(clickedCell.locationId);
      const polygon = polygonFeature(coordinates);

      cellSource.setData(polygon);
    }

    this.removeCellInfoPopup();
    this.addCellInfoPopup(clickedCell);
    this.updateCellPopupPosition();
  };

  updateGridLines = () => {
    if (this.map.getZoom() < getMinGridZoom(this.currentPrecision)) {
      return;
    }

    const mapBounds = this.map.getBounds();
    const gridLinesSource: maplibregl.GeoJSONSource = this.map.getSource(
      GRID_LINES_SOURCE
    ) as maplibregl.GeoJSONSource;

    if (gridLinesSource) {
      gridLinesSource.setData(
        lineFeatureCollection(
          convertBoundsToGridLines(mapBounds, this.currentPrecision)
        )
      );
    }
  };

  addLayersAndSources = () => {
    this.map.getSource(GRID_LINES_SOURCE) === undefined &&
      this.map.addSource(GRID_LINES_SOURCE, {
        type: "geojson",
        data: lineFeatureCollection([]),
      });

    this.map.getSource(CELL_SOURCE) === undefined &&
      this.map.addSource(CELL_SOURCE, {
        type: "geojson",
        data: polygonFeature([]),
      });

    this.map.getLayer(GRID_LINES_LAYER) === undefined &&
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
        minzoom: getMinGridZoom(this.currentPrecision),
      });

    this.map.getLayer(CELL_FILL_LAYER) === undefined &&
      this.map.addLayer({
        id: CELL_FILL_LAYER,
        type: "fill",
        source: CELL_SOURCE,
        paint: {
          "fill-color": this.cellFillColor,
        },
        minzoom: getMinGridZoom(this.currentPrecision),
      });

    this.map.getLayer(CELL_BORDER_LAYER) === undefined &&
      this.map.addLayer({
        id: CELL_BORDER_LAYER,
        type: "line",
        source: CELL_SOURCE,
        paint: {
          "line-color": this.lineColor,
          "line-width": 1,
        },
        minzoom: getMinGridZoom(this.currentPrecision),
      });
  };

  showGrid = () => {
    this.gridButton.setIcon(selectedGridIcon());
    this.updateGridLines();
    this.map.on("click", this.handleMapClick);
    this.map.on("move", this.updateCellPopupPosition);
    this.map.on("moveend", this.updateGridLines);
  };

  hideGrid = () => {
    this.gridButton.setIcon(gridIcon());

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

  showGridSelector = () => {
    this.gridSelector.style.display = "block";
  };

  hideGridSelector = () => {
    this.gridSelector.style.display = "none";
  };

  onAddControl = () => {
    this.insert();
  };

  onRemoveControl = () => {
    this.hideGrid();
  };
}
