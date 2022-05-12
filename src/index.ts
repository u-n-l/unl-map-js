import * as Maplibre from "maplibre-gl";
import UnlMap from "./Map/UnlMap";

const exported = {
  ...Maplibre,
  Map: UnlMap,
};

export default exported;
