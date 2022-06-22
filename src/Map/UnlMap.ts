import { ControlPosition, Map, MapOptions } from "maplibre-gl";
import { getStyle } from "../controls/TilesSelectorControl/styles/MapTiles";
import {
  DraftShapesControl,
  GridControl,
  IndoorControl,
  TilesSelectorControl,
} from "../controls";
import ZoomLevel from "./models/ZoomLevel";

const DEFAULT_GRID_CONTROL_POSITION = "top-right";
const DEFAULT_INDOOR_MAPS_CONTROL_POSITION = "top-right";
const DEFAULT_TILES_SELECTOR_CONTROL_POSITION = "top-left";
const DEFAULT_DRAFT_SHAPES_CONTROL_BUTTON = "top-left";

export type UnlMapOptions = Omit<
  MapOptions,
  "maplibreLogo" | "logoPosition"
> & {
  apiKey: string;
  vpmId: string;
  gridControl?: boolean;
  indoorMapsControl?: boolean;
  tilesSelectorControl?: boolean;
  draftShapesControl?: boolean;
};

class UnlMap extends Map {
  apiKey: string;
  vpmId: string;
  mapTilesControlPosition: ControlPosition;

  constructor(options: UnlMapOptions) {
    super({
      ...options,
      style: options.style ?? getStyle(),
      minZoom: options.minZoom ?? ZoomLevel.MIN_ZOOM,
      maxZoom: options.maxZoom ?? ZoomLevel.MAX_ZOOM,
      maplibreLogo: false,
      logoPosition: undefined,
    });

    this.apiKey = options.apiKey;
    this.vpmId = options.vpmId;
    this.mapTilesControlPosition = DEFAULT_TILES_SELECTOR_CONTROL_POSITION;

    if (options.indoorMapsControl) {
      this.addControl(
        new IndoorControl(),
        DEFAULT_INDOOR_MAPS_CONTROL_POSITION
      );
    }
    if (options.tilesSelectorControl) {
      this.addControl(
        new TilesSelectorControl({
          displayControlsDefault: true,
        }),
        this.mapTilesControlPosition
      );
    }
    if (options.draftShapesControl) {
      this.addControl(
        new DraftShapesControl(),
        DEFAULT_DRAFT_SHAPES_CONTROL_BUTTON
      );
    }
    if (options.gridControl) {
      this.addControl(new GridControl(), DEFAULT_GRID_CONTROL_POSITION);
    }
  }

  getApiKey = () => {
    return this.apiKey;
  };

  getVpmId = () => {
    return this.vpmId;
  };

  getMapTilesControlPosition = () => {
    return this.mapTilesControlPosition;
  };
}

export default UnlMap;
