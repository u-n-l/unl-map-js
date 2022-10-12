import {
  ENDPOINTS_VERSION,
  TILES_BASE_URL,
} from "../../../api/common/RestClient";

export default {
  version: 8,
  sources: {
    traffic: {
      type: "raster",
      tiles: [
        `${TILES_BASE_URL}/${ENDPOINTS_VERSION}/raster/1/traffic/{z}/{x}/{y}`,
      ],
      tileSize: 256,
    },
  },
  glyphs: "https://assets.vector.hereapi.com/fonts/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "traffic-tiles",
      type: "raster",
      source: "traffic",
      minzoom: 0,
      maxzoom: 22,
      layout: {
        visibility: "visible",
      },
    },
  ],
};
