import turfArea from "@turf/area";
import { RecordFeatureType } from "../../api/records/models/RecordFeatureType";
import CellPrecision from "../GridControl/CellPrecision";
//@ts-ignore
import * as UnlCore from "unl-core";

export const shapeCoordinatesToClusterId = (
  coordinates: GeoJSON.Position[],
  clusterPrecision: CellPrecision
): string => {
  //@ts-ignore
  const cluster = UnlCore.Polyhash.toCluster(coordinates[0], clusterPrecision);

  //@ts-ignore
  return UnlCore.Polyhash.compress(cluster);
};

export const generateDraftShapeProperties = (
  draftShape: GeoJSON.Feature,
  clusterPrecision: CellPrecision
): GeoJSON.GeoJsonProperties => {
  return {
    feature_type: RecordFeatureType.DRAFT_SHAPE,
    clusterId: shapeCoordinatesToClusterId(
      //@ts-ignore
      draftShape.geometry.coordinates,
      clusterPrecision
    ),
    area: turfArea(draftShape),
    shape: draftShape.properties?.shape ?? draftShape.geometry.type,
  };
};

export const appendDraftShapeFeatureProperties = (
  draftShape: GeoJSON.Feature,
  clusterPrecision: CellPrecision
): GeoJSON.Feature => {
  return {
    ...draftShape,
    properties: generateDraftShapeProperties(draftShape, clusterPrecision),
  };
};
