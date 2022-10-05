import {
  ENDPOINTS_VERSION,
  TILES_BASE_URL,
} from "../../../api/common/RestClient";
import { DEFAULT_ATTRIBUTION } from "../../CustomAttributionControl/helpers";

export default {
  version: 8,
  sources: {
    "raster-tiles": {
      type: "raster",
      tiles: [
        `${TILES_BASE_URL}/${ENDPOINTS_VERSION}/raster/1/terrain/{z}/{x}/{y}`,
      ],
      tileSize: 512,
      attribution: DEFAULT_ATTRIBUTION,
    },
  },
  glyphs: "https://assets.vector.hereapi.com/fonts/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "simple-tiles",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 22,
      layout: {
        visibility: "visible",
      },
    },
  ],
};
