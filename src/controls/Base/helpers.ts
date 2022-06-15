export const featureCollection = (
  features: GeoJSON.Feature[]
): GeoJSON.FeatureCollection => {
  return {
    type: "FeatureCollection",
    features,
  };
};

export const polygonFeature = (
  coordinates: GeoJSON.Position[][],
  properties?: GeoJSON.GeoJsonProperties
): GeoJSON.Feature => {
  return {
    type: "Feature",
    properties: properties ?? {},
    geometry: {
      type: "Polygon",
      coordinates: coordinates,
    },
  };
};
