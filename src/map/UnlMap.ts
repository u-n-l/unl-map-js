import { Map, MapOptions, ResourceTypeEnum } from "maplibre-gl";
import {
  getStyle,
  MapTiles,
} from "../controls/TilesSelectorControl/styles/MapTiles";
import {
  DraftShapesControl,
  GridControl,
  IndoorControl,
  TilesSelectorControl,
} from "../controls";
import ZoomLevel from "./models/ZoomLevel";
import Environment from "./models/Environment";

import { X_UNL_API_KEY, X_UNL_VPM_ID } from "../api/common/RestClient";
import CustomAttributionControl from "../controls/CustomAttributionControl/CustomAttributionControl";

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
  env?: Environment;
};

class UnlMap extends Map {
  apiKey: string;
  vpmId: string;
  env: Environment;
  currentTile: MapTiles;

  constructor(options: UnlMapOptions) {
    super({
      ...options,
      style: options.style ?? getStyle(undefined, options.env),
      minZoom: options.minZoom ?? ZoomLevel.MIN_ZOOM,
      maxZoom: options.maxZoom ?? ZoomLevel.MAX_ZOOM,
      maplibreLogo: false,
      logoPosition: undefined,
      transformRequest: (url?: string, resourceType?: ResourceTypeEnum) => {
        const unlTilesRequestRegEx = new RegExp(
          "https://(.*\\.)?tiles\\.unl\\.\\global/.*"
        );
        if (unlTilesRequestRegEx.test(url || "")) {
          return {
            url: url!,
            headers: {
              [X_UNL_API_KEY]: options.apiKey,
              [X_UNL_VPM_ID]: options.vpmId,
            },
            credentials: "same-origin",
          };
        }
        return { url: url || "" };
      },
    });

    this.apiKey = options.apiKey;
    this.vpmId = options.vpmId;
    this.env = options.env ?? Environment.PROD;

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
        DEFAULT_TILES_SELECTOR_CONTROL_POSITION
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

    this.currentTile = "vectorial";

    this.addControl(new CustomAttributionControl());
  }

  getApiKey = () => {
    return this.apiKey;
  };

  getVpmId = () => {
    return this.vpmId;
  };

  getEnv = () => {
    return this.env;
  };

  setCurrentTilesOption = (tile: MapTiles) => {
    this.currentTile = tile;
  };

  getCurrentTilesOption = () => {
    return this.currentTile;
  };
}

export default UnlMap;
