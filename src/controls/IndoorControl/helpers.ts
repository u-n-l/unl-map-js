import { Record } from "../../api/records/models/Record";
import { polygonFeature } from "../Base/helpers";
import { FacilityCategory } from "./models/FacilityCategory";

export const getIsFacility = (feature: GeoJSON.Feature) => {
  if (!feature.properties || !feature.properties.category) {
    return false;
  }

  let isFacility = false;

  switch (feature.properties.category.toLowerCase()) {
    case FacilityCategory.ELEVATOR:
    case FacilityCategory.ESCALATOR:
    case FacilityCategory.RESTROOM_FEMALE:
    case FacilityCategory.RESTROOM_MALE:
    case FacilityCategory.PARKING:
    case FacilityCategory.STEPS:
    case FacilityCategory.STAIRS: {
      isFacility = true;
      break;
    }
  }

  return isFacility;
};

export const getUnitCategoryName = (unitCategory: string) => {
  return unitCategory.charAt(0).toUpperCase() + unitCategory.slice(1);
};

export const getDefaultDisplayedFeatureName = (
  feature: GeoJSON.Feature,
  defaultValue?: string
) => {
  const featureName = feature.properties?.name;

  return featureName
    ? featureName.en ??
        featureName[Object.keys(featureName)[0]] ??
        defaultValue ??
        ""
    : defaultValue ?? "";
};

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

export const venueUnitMarkersToFeatureCollection = (
  units: GeoJSON.FeatureCollection
): GeoJSON.FeatureCollection => {
  return {
    ...units,
    features: units.features.map((feature) => {
      const isFacility = getIsFacility(feature);

      return {
        ...feature,
        properties: {
          ...feature.properties,
          name: isFacility
            ? getUnitCategoryName(feature.properties!.category)
            : getDefaultDisplayedFeatureName(
                feature,
                getUnitCategoryName(feature.properties!.category)
              ),
        },
      };
    }),
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
