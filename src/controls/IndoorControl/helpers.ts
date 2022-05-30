import { Record } from "../../api/records/models/Record";
import { polygonFeature } from "../GridControl/helpers";

export const pointFeature = (
  coordinates: GeoJSON.Position,
  properties: GeoJSON.GeoJsonProperties
): GeoJSON.Feature => {
  return {
    type: "Feature",
    properties,
    geometry: {
      type: "Point",
      coordinates: coordinates,
    },
  };
};

export const featureCollection = (
  features: GeoJSON.Feature[]
): GeoJSON.FeatureCollection => {
  return {
    type: "FeatureCollection",
    features,
  };
};

export const venuesToFeatureCollection = (
  isPoint: boolean,
  records: Record[]
): GeoJSON.FeatureCollection => {
  return {
    type: "FeatureCollection",
    features: records.map((record) =>
      isPoint
        ? pointFeature([record.longitude, record.latitude], {
            id: record.venueId,
          })
        : polygonFeature(record.geojson.geometry.coordinates, {
            id: record.venueId,
          })
    ),
  };
};
