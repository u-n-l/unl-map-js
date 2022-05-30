import { ImdfFeatureType } from "./ImdfFeatureType";

type ImdfFeatureSpecific = {
  featureType: ImdfFeatureType;
  unlId: string;
  venueId?: string;
};

type ImdfFeature = ImdfFeatureSpecific & GeoJSON.Feature;
export default ImdfFeature;
