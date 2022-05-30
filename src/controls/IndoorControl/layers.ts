import { LayerSpecification } from "maplibre-gl";
import ZoomLevel from "../../map/zoomLevels";

export const VENUE_MARKERS_SOURCE = "controls-indoor-venue-marker-source";
export const VENUE_FOOTPRINT_SOURCE = "controls-indoor-venue-footprint-source";

export const VENUE_UNIT_MARKERS_SOURCE =
  "controls-indoor-venue-unit-markers-source";
export const VENUE_LEVEL_SOURCE = "controls-indoor-venue-level-source";
export const VENUE_UNITS_SOURCE = "controls-indoor-venue-units-source";
export const VENUE_OPENINGS_SOURCE = "controls-indoor-venue-openings-source";

export const VENUE_MARKERS_SYMBOL_LAYER =
  "controls-indoor-venue-marker-symbol-layer";
export const VENUE_FOOTPRINT_FILL_LAYER =
  "controls-indoor-venue-footprint-fill-layer";

export const VENUE_UNIT_MARKERS_SYMBOL_LAYER =
  "controls-indoor-venue-unit-markers-symbol-layer";
export const VENUE_LEVEL_FILL_LAYER = "controls-indoor-venue-level-fill-layer";
export const VENUE_LEVEL_LINE_LAYER = "controls-indoor-venue-level-line-layer";
export const VENUE_UNITS_FILL_LAYER = "controls-indoor-venue-units-fill-layer";
export const VENUE_UNITS_LINE_LAYER = "controls-indoor-venue-units-line-layer";
export const VENUE_OPENINGS_LINE_LAYER =
  "controls-indoor-venue-openings-line-layer";

export const venueMarkersSymbolLayer: LayerSpecification = {
  id: VENUE_MARKERS_SYMBOL_LAYER,
  type: "symbol",
  source: VENUE_MARKERS_SOURCE,
  paint: {
    "text-color": "#808080",
    "text-halo-width": 2,
    "text-halo-color": "hsl(0, 3%, 99%)",
    "text-opacity": ["step", ["zoom"], 1, 15, 1, 17, 0.5],
  },
  layout: {
    // "icon-image": "venue-marker-icon",
    // "icon-offset": [
    //   "interpolate",
    //   ["linear"],
    //   ["zoom"],
    //   ZoomLevel.MIN_ZOOM,
    //   ["literal", [0, -40]],
    //   ZoomLevel.MAX_ZOOM,
    //   ["literal", [0, -35]],
    // ],
    "text-optional": true,
    "text-field": ["get", "name"],
    "text-font": ["Fira GO Regular"],
    "text-size": 13,
    "text-anchor": "bottom",
    "text-offset": [
      "interpolate",
      ["linear", 0.005],
      ["zoom"],
      ZoomLevel.MIN_ZOOM,
      ["literal", [0, -3]],
      ZoomLevel.MAX_ZOOM,
      ["literal", [0, -2.5]],
    ],
    "icon-size": [
      "interpolate",
      ["linear"],
      ["zoom"],
      ZoomLevel.MIN_ZOOM,
      0.4,
      ZoomLevel.MAX_ZOOM,
      0.35,
    ],
  },
};

export const venueFootprintFillLayer: LayerSpecification = {
  id: VENUE_FOOTPRINT_FILL_LAYER,
  type: "fill",
  source: VENUE_FOOTPRINT_SOURCE,
  paint: {
    "fill-outline-color": [
      "step",
      ["zoom"],
      "hsla(0, 0%, 95%, 0)",
      15,
      "hsl(0, 0%, 82%)",
      17,
      "hsl(0, 0%, 2%)",
    ],
    // "fill-color": [
    //   "step",
    //   ["zoom"],
    //   "hsla(29, 0%, 100%, 0)",
    //   12,
    //   "hsla(47, 85%, 92%, 0.6)",
    //   17,
    //   "hsla(48, 94%, 93%, 0.9)",
    // ],
    "fill-color": "#ff0000",
    // "fill-opacity": ["step", ["zoom"], 0, 14, 1],
  },
};

export const venueUnitsFillLayer: LayerSpecification = {
  id: VENUE_UNITS_FILL_LAYER,
  type: "fill",
  source: VENUE_UNITS_SOURCE,
  filter: [
    "all",
    ["==", ["get", "level_id"], 0],
    ["!=", ["get", "category"], "walkway"],
  ],
  paint: {
    "fill-color": [
      "case",
      ["match", ["get", "category"], ["walkway", "restroom.male"], true, false],
      "#FFFFFF",
      [
        "match",
        ["get", "category"],
        ["stairs", "elevator", "escalator"],
        true,
        false,
      ],
      "#769adb",
      ["match", ["get", "category"], ["stairs"], true, false],
      "#769adb",
      ["match", ["get", "category"], ["restroom.female"], true, false],
      "#f5bcbc",
      ["match", ["get", "category"], ["restroom.male"], true, false],
      "#f5bcbc",
      ["match", ["get", "category"], ["nonpublic"], true, false],
      "hsla(21, 0%, 88%, 0.4)",
      "hsl(239, 37%, 93%)",
    ],
    "fill-outline-color": "hsl(32, 0%, 35%)",
    "fill-opacity": ["step", ["zoom"], 0, 16, 1, 17, 1],
  },
};

export const venueUnitsLineLayer: LayerSpecification = {
  id: VENUE_UNITS_LINE_LAYER,
  type: "line",
  source: VENUE_UNITS_SOURCE,
  filter: [
    "all",
    ["==", ["get", "level_id"], 0],
    ["!=", ["get", "category"], "walkway"],
  ],
  paint: {
    "line-color": "hsl(28, 0%, 58%)",
    "line-opacity": ["step", ["zoom"], 0, 17, 1],
  },
};

export const venueLevelFillLayer: LayerSpecification = {
  id: VENUE_LEVEL_FILL_LAYER,
  type: "fill",
  source: VENUE_LEVEL_SOURCE,
  filter: ["==", "ordinal", 0],
  paint: {
    "fill-color": [
      "step",
      ["zoom"],
      "hsla(25, 4%, 100%, 0)",
      16,
      "hsl(0, 1%, 100%)",
    ],
    "fill-outline-color": [
      "step",
      ["zoom"],
      "hsla(0, 1%, 99%, 0)",
      17,
      "hsl(0, 0%, 29%)",
    ],
    "fill-opacity": ["step", ["zoom"], 0, 15.5, 1],
  },
};

export const venueLevelLineLayer: LayerSpecification = {
  id: VENUE_LEVEL_LINE_LAYER,
  type: "line",
  source: VENUE_LEVEL_SOURCE,
  filter: ["==", "ordinal", 0],
  layout: { "line-cap": "round" },
  paint: {
    "line-color": "hsl(28, 0%, 49%)",
    "line-width": ["step", ["zoom"], 0, 16, 1, 17, 2],
    "line-opacity": ["step", ["zoom"], 0, 16, 1, 17, 1],
  },
};

export const venueOpeningLineLayer: LayerSpecification = {
  id: VENUE_OPENINGS_LINE_LAYER,
  type: "line",
  source: VENUE_OPENINGS_SOURCE,
  filter: ["all", ["==", ["get", "level_id"], 0]],
  layout: { "line-join": "bevel", "line-cap": "round" },
  paint: {
    "line-color": "#769adb",
    "line-width": 2,
    "line-opacity": ["step", ["zoom"], 0, 17, 1],
  },
};

export const venueUnitMarkersSymbolLayer: LayerSpecification = {
  id: VENUE_UNIT_MARKERS_SYMBOL_LAYER,
  type: "symbol",
  source: VENUE_UNIT_MARKERS_SOURCE,
  filter: [
    "all",
    ["==", ["get", "level_id"], 0],
    ["!=", ["get", "category"], "walkway"],
  ],
  paint: {
    "text-color": [
      "interpolate",
      ["linear"],
      ["zoom"],
      0,
      "#444444",
      12,
      "#444444",
    ],
    "text-halo-color": "#FFFFFF",
    "text-halo-width": ["interpolate", ["linear"], ["zoom"], 0, 2, 22, 2],
    "text-opacity": ["step", ["zoom"], 0, 17, 1],
    "icon-opacity": ["step", ["zoom"], 0, 17, 1],
  },
  layout: {
    "text-size": 14,
    "text-radial-offset": 2,
    "text-optional": true,
    "icon-image": [
      "step",
      ["zoom"],
      ["get", "icon"],

      16,
      ["get", "smallIcon"],

      18,
      ["get", "icon"],
    ],
    "text-font": ["Fira GO Regular"],
    "text-padding": 10,
    "icon-size": ["get", "iconSize"],
    "text-anchor": "top",
    "text-field": ["get", "name"],
  },
};
