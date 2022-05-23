import { LngLat, MapMouseEvent } from "maplibre-gl";
import ControlButton from "../../ui/buttons/ControlButton/ControlButton";
import gridIcon from "../../icons/ts/GridIcon";
import selectedGridIcon from "../../icons/ts/SelectedGridIcon";
import Base from "../Base/Base";
import {
  cellInfoPopupTemplate,
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
  top: 70,
};

export interface GridControlOptions {
  precision?: CellPrecision;
  lineColor?: string;
  lineWidth?: number;
  cellFillColor?: string;
  cellBorderColor?: string;
}

export default class GridControl extends Base {
  isGridVisible: boolean;
  gridButton: ControlButton;
  precision: CellPrecision;
  lineColor: string;
  lineWidth: number;
  cellFillColor: string;
  cellBorderColor: string;
  cellInfoPopupNode?: HTMLDivElement;
  clickedLngLat?: LngLat;

  constructor(options?: GridControlOptions) {
    super();

    this.gridButton = new ControlButton().setIcon(gridIcon());
    this.isGridVisible = false;

    this.precision = options?.precision ?? CellPrecision.GEOHASH_LENGTH_9;
    this.lineColor = options?.lineColor ?? DEFAULT_LINES_COLOR;
    this.lineWidth = options?.lineWidth ?? DEFAULT_WIDTH;
    this.cellFillColor = options?.cellFillColor ?? DEFAULT_CELL_FILL_COLOR;
    this.cellBorderColor =
      options?.cellBorderColor ?? DEFAULT_CELL_BORDER_COLOR;
  }

  insert = () => {
    this.gridButton.onClick(this.handleGridButtonClick);
    this.addButton(this.gridButton);
  };

  updateCellPopupPosition = () => {
    if (!this.cellInfoPopupNode || !this.clickedLngLat) {
      return;
    }

    if (this.map.getZoom() < getMinGridZoom(this.precision)) {
      this.cellInfoPopupNode.style.visibility = "hidden";
    } else {
      this.cellInfoPopupNode.style.visibility = "visible";
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
    this.cellInfoPopupNode = cellInfoPopupTemplate(cell);

    this.map.getContainer().appendChild(this.cellInfoPopupNode);
  };

  removeCellInfoPopup = () => {
    if (!this.cellInfoPopupNode) {
      return;
    }

    this.map.getContainer().removeChild(this.cellInfoPopupNode!);
    this.cellInfoPopupNode = undefined;
  };

  handleMapClick = (e: MapMouseEvent) => {
    const clickedCell = getCell(e.lngLat, this.precision);
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
    if (
      !this.isGridVisible ||
      this.map.getZoom() < getMinGridZoom(this.precision)
    ) {
      return;
    }

    const mapBounds = this.map.getBounds();
    const gridLinesSource: maplibregl.GeoJSONSource = this.map.getSource(
      GRID_LINES_SOURCE
    ) as maplibregl.GeoJSONSource;

    if (gridLinesSource) {
      gridLinesSource.setData(
        lineFeatureCollection(
          convertBoundsToGridLines(mapBounds, this.precision)
        )
      );
    }
  };

  showGrid = () => {
    this.map.addSource(GRID_LINES_SOURCE, {
      type: "geojson",
      data: lineFeatureCollection([]),
    });

    this.map.addSource(CELL_SOURCE, {
      type: "geojson",
      data: polygonFeature([]),
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
      minzoom: getMinGridZoom(this.precision),
    });

    this.map.addLayer({
      id: CELL_FILL_LAYER,
      type: "fill",
      source: CELL_SOURCE,
      paint: {
        "fill-color": this.cellFillColor,
      },
      minzoom: getMinGridZoom(this.precision),
    });

    this.map.addLayer({
      id: CELL_BORDER_LAYER,
      type: "line",
      source: CELL_SOURCE,
      paint: {
        "line-color": this.lineColor,
        "line-width": 1,
      },
      minzoom: getMinGridZoom(this.precision),
    });

    this.gridButton.setIcon(selectedGridIcon());
    this.isGridVisible = true;
    this.updateGridLines();
    this.map.on("click", this.handleMapClick);
    this.map.on("move", this.updateCellPopupPosition);
    this.map.on("moveend", this.updateGridLines);
  };

  hideGrid = () => {
    this.isGridVisible = false;
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

  handleGridButtonClick = () => {
    if (this.isGridVisible) {
      this.hideGrid();
    } else {
      this.showGrid();
    }
  };

  onAddControl = () => {
    this.insert();
  };

  onRemoveControl = () => {
    if (this.isGridVisible) {
      this.hideGrid();
    }
  };
}
