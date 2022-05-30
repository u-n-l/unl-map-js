import { Record } from "../../api/records/models/Record";
import { polygonFeature } from "../GridControl/helpers";

export const getRecordName = (record: Record) => {
  const nameObject = record.geojson.properties.name;
  return nameObject.en ?? nameObject[Object.keys(nameObject)[0]];
};

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

export const venuesRecordsToFeatureCollection = (
  isPoint: boolean,
  records: Record[]
): GeoJSON.FeatureCollection => {
  return {
    type: "FeatureCollection",
    features: records.map((record) =>
      isPoint
        ? pointFeature([record.longitude, record.latitude], {
            id: record.venueId,
            name: getRecordName(record),
          })
        : polygonFeature(record.geojson.geometry.coordinates, {
            id: record.venueId,
          })
    ),
  };
};
