import { FillLayerSpecification, LineLayerSpecification } from "maplibre-gl";
import { DRAFT_SHAPES_SOURCE } from "./sources";

export const DRAFT_SHAPES_FILL_LAYER = "controls-draft-shapes-fill-layer";
export const DRAFT_SHAPES_LINE_LAYER = "controls-draft-shapes-line-layer";

export const draftShapesFillLayer: FillLayerSpecification = {
  id: DRAFT_SHAPES_FILL_LAYER,
  type: "fill",
  source: DRAFT_SHAPES_SOURCE,
  paint: {
    "fill-color": "#2CD6FF",
    "fill-opacity": 0.2,
  },
};

export const draftShapesLineLayer: LineLayerSpecification = {
  id: DRAFT_SHAPES_LINE_LAYER,
  type: "line",
  source: DRAFT_SHAPES_SOURCE,
  paint: {
    "line-color": "#2CD6FF",
    "line-width": 1,
    "line-opacity": 1,
  },
};
