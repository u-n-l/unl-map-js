import {
  ENDPOINTS_VERSION,
  SANDBOX_TILES_BASE_URL,
  TILES_BASE_URL,
} from "../../../api/common/RestClient";
import Environment from "../../../map/models/Environment";

export default (env?: Environment) => {
  return {
    version: 8,
    name: "UNL_Traffic_1_Default",
    sources: {
      traffic: {
        type: "raster",
        tiles: [
          `${
            env == Environment.SANDBOX ? SANDBOX_TILES_BASE_URL : TILES_BASE_URL
          }/${ENDPOINTS_VERSION}/raster/1/traffic/{z}/{x}/{y}`,
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
};
