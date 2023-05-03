import * as Maplibre from "maplibre-gl";
import * as Controls from "./controls";
import UnlMap from "./map/UnlMap";
import Environment from "./map/models/Environment";

const exported = {
  ...Maplibre,
  Map: UnlMap,
  Environment,
  ...Controls,
};

export default exported;
