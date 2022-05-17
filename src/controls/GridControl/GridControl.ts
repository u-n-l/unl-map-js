import ControlButton from "../../ui/buttons/ControlButton/ControlButton";
import Base from "../Base/Base";
import gridIcon from "../../icons/ts/GridIcon";
import selectedGridIcon from "../../icons/ts/SelectedGridIcon";
import {
  convertBoundsToGridLines,
  getMinGridZoom,
  lineFeatureCollection,
} from "./helpers";
import CellPrecision from "./CellPrecision";

const GRID_LINES_SOURCE = "controls-grid-lines-source";
const GRID_LINES_LAYER = "controls-grid-lines-layer";

const DEFAULT_COLOR = "#C0C0C0";
const DEFAULT_WIDTH = 0.5;

export interface GridControlOptions {
  precision?: CellPrecision;
  lineColor?: string;
  lineWidth?: number;
}

export default class GridControl extends Base {
  isGridVisible: boolean;
  gridButton: ControlButton;
  precision: CellPrecision;
  lineColor: string;
  lineWidth: number;

  constructor(options?: GridControlOptions) {
    super();

    this.gridButton = new ControlButton().setIcon(gridIcon());
    this.isGridVisible = false;

    this.precision = options?.precision ?? CellPrecision.GEOHASH_LENGTH_9;
    this.lineColor = options?.lineColor ?? DEFAULT_COLOR;
    this.lineWidth = options?.lineWidth ?? DEFAULT_WIDTH;
  }

  insert = () => {
    this.addClassName("unl-grid-control");
    this.gridButton.onClick(this.handleGridButtonClick);
    this.addButton(this.gridButton);
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

    this.gridButton.setIcon(selectedGridIcon());
    this.isGridVisible = true;
    this.updateGridLines();
    this.map.on("moveend", this.updateGridLines);
  };

  hideGrid = () => {
    this.isGridVisible = false;

    this.gridButton.setIcon(gridIcon());
    this.map.off("moveend", this.updateGridLines);
    this.map.removeLayer(GRID_LINES_LAYER);
    this.map.removeSource(GRID_LINES_SOURCE);
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
