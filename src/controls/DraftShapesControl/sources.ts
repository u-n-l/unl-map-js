import { SourceSpecification } from "maplibre-gl";
import { featureCollection } from "../Base/helpers";

export const DRAFT_SHAPES_SOURCE = "controls-draft-shapes-source";

export const draftShapesSource: SourceSpecification = {
  type: "geojson",
  data: featureCollection([]),
};
