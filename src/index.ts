import * as Maplibre from "maplibre-gl";
import { GridControl, GridControlOptions, CellPrecision } from "./controls";
import UnlMap from "./map/UnlMap";

const exported = {
  ...Maplibre,
  Map: UnlMap,
  GridControl,
  GridControlOptions,
  CellPrecision,
};

export default exported;
