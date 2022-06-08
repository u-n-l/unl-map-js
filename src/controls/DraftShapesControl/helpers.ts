import turfArea from "@turf/area";
import { RecordFeatureType } from "../../api/records/models/RecordFeatureType";
import CellPrecision from "../GridControl/CellPrecision";
//@ts-ignore
import * as UnlCore from "unl-core";

export const shapeCoordinatesToClusterId = (
  coordinates: GeoJSON.Position[]
): string => {
  let compressedCluster = "";

  //@ts-ignore
  const cluster = UnlCore.Polyhash.toCluster(
    coordinates[0],
    CellPrecision.GEOHASH_LENGTH_10
  );
  //@ts-ignore
  compressedCluster = UnlCore.Polyhash.compress(cluster);

  return compressedCluster;
};

export const generateDraftShapeProperties = (
  draftShape: GeoJSON.Feature
): GeoJSON.GeoJsonProperties => {
  return {
    feature_type: RecordFeatureType.DRAFT_SHAPE,
    //@ts-ignore
    clusterId: shapeCoordinatesToClusterId(draftShape.geometry.coordinates),
    area: turfArea(draftShape),
    shape: draftShape.properties?.shape ?? draftShape.geometry.type,
  };
};

export const appendDraftShapeFeatureProperties = (
  draftShape: GeoJSON.Feature
): GeoJSON.Feature => {
  return {
    ...draftShape,
    properties: generateDraftShapeProperties(draftShape),
  };
};
