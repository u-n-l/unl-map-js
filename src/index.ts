import * as Maplibre from "maplibre-gl";
import * as Controls from "./controls";
import UnlMap from "./unlMap/UnlMap";

const exported = {
  ...Maplibre,
  Map: UnlMap,
  ...Controls,
};

export default exported;
