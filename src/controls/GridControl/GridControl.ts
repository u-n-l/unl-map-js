import { LngLat, MapMouseEvent } from "maplibre-gl";
import ControlButton from "../components/ControlButton";
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
} from "./helpers";
import CellPrecision from "./models/CellPrecision";
import Cell from "./models/Cell";
import cellInfoPopupTemplate from "./components/CellPopup/cellPopup";
import gridSelectorModal from "./components/GridSelectorModal/gridSelectorModal";
import { polygonFeature } from "../Base/helpers";
import {
  gridCellSource,
  gridLinesSource,
  GRID_CELL_SOURCE,
  GRID_LINES_SOURCE,
} from "./sources";
import { gridCellFillLayer, gridCellLineLayer, gridLinesLayer } from "./layers";

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
  private gridButton: ControlButton;
  private currentPrecision: CellPrecision;
  private lineColor: string;
  private lineWidth: number;
  private cellFillColor: string;
  private cellBorderColor: string;
  private gridSelector: HTMLDivElement;
  private cellInfoPopupNode?: HTMLDivElement;
  private clickedLngLat?: LngLat;

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

  private handlePrecisionChange = (newPrecision: CellPrecision) => {
    this.currentPrecision = newPrecision;

    this.hideGridSelector();
    this.removeCellInfoPopup();
    this.resetCell();

    this.updateGridLines();
    const newMinGridZoom = getMinGridZoom(this.currentPrecision);

    this.map.setLayerZoomRange(GRID_LINES_LAYER, newMinGridZoom, 24);
    this.map.setLayerZoomRange(CELL_BORDER_LAYER, newMinGridZoom, 24);
    this.map.setLayerZoomRange(CELL_FILL_LAYER, newMinGridZoom, 24);
  };

  private insert = () => {
    this.gridButton.onClick(this.showGridSelector);
    this.addButton(this.gridButton);
    this.map.getContainer().appendChild(this.gridSelector);
    this.map.on("styledata", this.handleStyleChange);
    this.showGrid();
  };

  private updateCellPopupPosition = () => {
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

  private addCellInfoPopup = (cell: Cell) => {
    this.cellInfoPopupNode = cellInfoPopupTemplate(cell.locationId);

    this.map.getContainer().appendChild(this.cellInfoPopupNode);
  };

  private removeCellInfoPopup = () => {
    if (!this.cellInfoPopupNode) {
      return;
    }

    this.map.getContainer().removeChild(this.cellInfoPopupNode!);
    this.cellInfoPopupNode = undefined;
  };

  private resetCell = () => {
    const cellSource: maplibregl.GeoJSONSource = this.map.getSource(
      GRID_CELL_SOURCE
    ) as maplibregl.GeoJSONSource;

    if (cellSource) {
      cellSource.setData(polygonFeature([]));
    }
  };

  private handleMapClick = (e: MapMouseEvent) => {
    const clickedCell = getCell(e.lngLat, this.currentPrecision);
    this.clickedLngLat = locationIdToLngLat(clickedCell.locationId);

    const cellSource: maplibregl.GeoJSONSource = this.map.getSource(
      GRID_CELL_SOURCE
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

  private updateGridLines = () => {
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

  private addLayersAndSources = () => {
    this.map.getSource(GRID_LINES_SOURCE) === undefined &&
      this.map.addSource(GRID_LINES_SOURCE, gridLinesSource);

    this.map.getSource(GRID_CELL_SOURCE) === undefined &&
      this.map.addSource(GRID_CELL_SOURCE, gridCellSource);

    const minGridZoom = getMinGridZoom(this.currentPrecision);

    this.map.getLayer(GRID_LINES_LAYER) === undefined &&
      this.map.addLayer(
        gridLinesLayer(
          {
            "line-color": this.lineColor,
            "line-width": this.lineWidth,
          },
          minGridZoom
        )
      );

    this.map.getLayer(CELL_FILL_LAYER) === undefined &&
      this.map.addLayer(
        gridCellFillLayer(
          {
            "fill-color": this.cellFillColor,
          },
          minGridZoom
        )
      );

    this.map.getLayer(CELL_BORDER_LAYER) === undefined &&
      this.map.addLayer(
        gridCellLineLayer({ "line-color": this.cellBorderColor }, minGridZoom)
      );
  };

  private showGrid = () => {
    this.gridButton.setIcon(selectedGridIcon());
    this.updateGridLines();
    this.map.on("click", this.handleMapClick);
    this.map.on("move", this.updateCellPopupPosition);
    this.map.on("moveend", this.updateGridLines);
  };

  private hideGrid = () => {
    this.gridButton.setIcon(gridIcon());

    this.map.off("moveend", this.updateGridLines);
    this.map.off("move", this.updateCellPopupPosition);
    this.map.off("click", this.handleMapClick);

    this.map.removeLayer(GRID_LINES_LAYER);
    this.map.removeSource(GRID_LINES_SOURCE);

    this.map.removeLayer(CELL_FILL_LAYER);
    this.map.removeLayer(CELL_BORDER_LAYER);
    this.map.removeSource(GRID_CELL_SOURCE);

    this.removeCellInfoPopup();
  };

  private handleStyleChange = () => {
    this.addLayersAndSources();
    this.updateGridLines();

    const cellSource: maplibregl.GeoJSONSource = this.map.getSource(
      GRID_CELL_SOURCE
    ) as maplibregl.GeoJSONSource;

    if (cellSource && this.clickedLngLat) {
      const geohash = getCell(this.clickedLngLat, this.currentPrecision);
      const coordinates = locationIdToBoundsCoordinates(geohash.locationId);
      const polygon = polygonFeature(coordinates);
      cellSource.setData(polygon);
    }
  };

  private showGridSelector = () => {
    this.gridSelector.style.display = "block";
  };

  private hideGridSelector = () => {
    this.gridSelector.style.display = "none";
  };

  onAddControl = () => {
    this.insert();
  };

  onRemoveControl = () => {
    this.hideGrid();
  };
}
