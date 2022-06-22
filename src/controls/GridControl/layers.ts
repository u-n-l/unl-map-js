import { FillLayerSpecification, LineLayerSpecification } from "maplibre-gl";
import { GRID_CELL_SOURCE, GRID_LINES_SOURCE } from "./sources";

export const GRID_LINES_LAYER = "controls-grid-lines-layer";
export const GRID_CELL_FILL_LAYER = "controls-grid-cell-fill-layer";
export const GRID_CELL_LINE_LAYER = "controls-grid-cell-line-layer";

export const gridLinesLayer = (
  paintProperties: LineLayerSpecification["paint"],
  minZoom: number
): LineLayerSpecification => {
  return {
    id: GRID_LINES_LAYER,
    type: "line",
    source: GRID_LINES_SOURCE,
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: { ...paintProperties },
    minzoom: minZoom,
  };
};

export const gridCellFillLayer = (
  paintProperties: FillLayerSpecification["paint"],
  minZoom: number
): FillLayerSpecification => {
  return {
    id: GRID_CELL_FILL_LAYER,
    type: "fill",
    source: GRID_CELL_SOURCE,
    paint: { ...paintProperties },
    minzoom: minZoom,
  };
};

export const gridCellLineLayer = (
  paintProperties: LineLayerSpecification["paint"],
  minZoom: number
): LineLayerSpecification => {
  return {
    id: GRID_CELL_LINE_LAYER,
    type: "line",
    source: GRID_CELL_SOURCE,
    paint: {
      ...paintProperties,
      "line-width": 1,
    },
    minzoom: minZoom,
  };
};
