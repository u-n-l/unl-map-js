import { SourceSpecification } from "maplibre-gl";
import { featureCollection } from "../Base/helpers";
import { venuesRecordsToFeatureCollection } from "./helpers";

export const VENUE_MARKERS_SOURCE = "controls-indoor-venue-marker-source";
export const VENUE_FOOTPRINT_SOURCE = "controls-indoor-venue-footprint-source";
export const VENUE_UNIT_MARKERS_SOURCE =
  "controls-indoor-venue-unit-markers-source";
export const VENUE_LEVEL_SOURCE = "controls-indoor-venue-level-source";
export const VENUE_UNITS_SOURCE = "controls-indoor-venue-units-source";
export const VENUE_OPENINGS_SOURCE = "controls-indoor-venue-openings-source";

export const venueMarkersSource: SourceSpecification = {
  type: "geojson",
  data: venuesRecordsToFeatureCollection(true, []),
};

export const venueFootprintSource: SourceSpecification = {
  type: "geojson",
  data: venuesRecordsToFeatureCollection(false, []),
};

export const venueLevelSource: SourceSpecification = {
  type: "geojson",
  data: featureCollection([]),
};

export const venueUnitsSource: SourceSpecification = {
  type: "geojson",
  data: featureCollection([]),
};

export const venueOpeningsSource: SourceSpecification = {
  type: "geojson",
  data: featureCollection([]),
};

export const venueUnitMarkersSource: SourceSpecification = {
  type: "geojson",
  data: featureCollection([]),
};
