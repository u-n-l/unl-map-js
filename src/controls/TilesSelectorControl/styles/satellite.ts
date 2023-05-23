import {
  ENDPOINTS_VERSION,
  SANDBOX_TILES_BASE_URL,
  TILES_BASE_URL,
} from "../../../api/common/RestClient";
import Environment from "../../../map/models/Environment";

export default (env?: Environment) => {
  return {
    version: 8,
    name: "UNL_Satellite_1_Default",
    sources: {
      "raster-tiles": {
        type: "raster",
        tiles: [
          `${
            env == Environment.SANDBOX ? SANDBOX_TILES_BASE_URL : TILES_BASE_URL
          }/${ENDPOINTS_VERSION}/raster/1/satellite/{z}/{x}/{y}`,
        ],
        tileSize: 512,
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
};
