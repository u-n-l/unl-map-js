import {
  ENDPOINTS_VERSION,
  SANDBOX_TILES_BASE_URL,
  TILES_BASE_URL,
} from "../../../api/common/RestClient";
import Environment from "../../../map/models/Environment";

export default (env?: Environment) => {
  return {
    version: 8,
    name: "Base map",
    sources: {
      omv: {
        type: "vector",
        tiles: [
          `${
            env == Environment.SANDBOX ? SANDBOX_TILES_BASE_URL : TILES_BASE_URL
          }/${ENDPOINTS_VERSION}/vector/1/{z}/{x}/{y}`,
        ],
        maxzoom: 17,
      },
    },
    glyphs: "https://assets.vector.hereapi.com/fonts/{fontstack}/{range}.pbf",
    layers: [
      {
        id: "background",
        type: "background",
        paint: { "background-color": "rgba(237, 237, 237, 1)" },
      },
      {
        id: "water",
        type: "fill",
        source: "omv",
        "source-layer": "water",
        filter: ["all", ["==", "$type", "Polygon"]],
        layout: { visibility: "visible" },
        paint: { "fill-color": "#c8e0f9" },
      },
      {
        id: "country-border-case",
        type: "line",
        source: "omv",
        "source-layer": "boundaries",
        filter: ["all", ["==", "kind", "country"]],
        paint: { "line-width": 0.5, "line-color": "rgba(82, 103, 110, 1)" },
      },
    ],
    id: "daaffb1ty",
  };
};
