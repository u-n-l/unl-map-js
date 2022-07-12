export default {
  version: 8,
  sources: {
    traffic: {
      type: "raster",
      maxzoom: 19,
      tiles: [`https://tiles.unl.global/v1/raster/1/traffic/{z}/{x}/{y}`],
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
