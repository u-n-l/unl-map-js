import { SourceSpecification } from "maplibre-gl";
import { polygonFeature } from "../Base/helpers";
import { lineFeatureCollection } from "./helpers";

export const GRID_LINES_SOURCE = "controls-grid-lines-source";
export const GRID_CELL_SOURCE = "controls-grid-cell-source";

export const gridLinesSource: SourceSpecification = {
  type: "geojson",
  data: lineFeatureCollection([]),
};

export const gridCellSource: SourceSpecification = {
  type: "geojson",
  data: polygonFeature([]),
};
