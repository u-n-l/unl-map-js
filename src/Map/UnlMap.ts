import {
  ControlPosition,
  DragPanOptions,
  LngLatBoundsLike,
  LngLatLike,
  Map,
  RequestTransformFunction,
} from "maplibre-gl";
import {
  DraftShapesControl,
  GridControl,
  IndoorControl,
  MapTilesControl,
} from "../controls";
import { getStyles } from "./styles/here";
import ZoomLevel from "./zoomLevels";

const DEFAULT_GRID_CONTROL_POSITION = "top-right";
const DEFAULT_INDOOR_MAPS_CONTROL_POSITION = "top-right";
const DEFAULT_TILES_SELECTOR_CONTROL_POSITION = "top-left";
const DEFAULT_DRAFT_SHAPES_CONTROL_BUTTON = "top-left";

export type UnlMapOptions = {
  apiKey: string;
  vpmId: string;
  gridControl?: boolean;
  gridControlPosition?: ControlPosition;
  indoorMapsControl?: boolean;
  indoorMapsControlPosition: ControlPosition;
  mapTilesControl?: boolean;
  mapTilesControlPosition?: ControlPosition;
  draftShapesControl?: boolean;
  draftShapesControlPosition?: ControlPosition;
  hash?: boolean | string;
  interactive?: boolean;
  container: HTMLElement | string;
  bearingSnap?: number;
  attributionControl?: boolean;
  customAttribution?: string | Array<string>;
  failIfMajorPerformanceCaveat?: boolean;
  preserveDrawingBuffer?: boolean;
  antialias?: boolean;
  refreshExpiredTiles?: boolean;
  maxBounds?: LngLatBoundsLike;
  scrollZoom?: boolean;
  minZoom?: number | null;
  maxZoom?: number | null;
  minPitch?: number | null;
  maxPitch?: number | null;
  boxZoom?: boolean;
  dragRotate?: boolean;
  dragPan?: DragPanOptions | boolean;
  keyboard?: boolean;
  doubleClickZoom?: boolean;
  touchZoomRotate?: boolean;
  touchPitch?: boolean;
  trackResize?: boolean;
  center?: LngLatLike;
  zoom?: number;
  bearing?: number;
  pitch?: number;
  renderWorldCopies?: boolean;
  maxTileCacheSize?: number;
  transformRequest?: RequestTransformFunction;
  locale?: any;
  fadeDuration?: number;
  crossSourceCollisions?: boolean;
  collectResourceTiming?: boolean;
  clickTolerance?: number;
  bounds?: LngLatBoundsLike;
  fitBoundsOptions?: Object;
  localIdeographFontFamily?: string;
  pitchWithRotate?: boolean;
  pixelRatio?: number;
};

class UnlMap extends Map {
  apiKey: string;
  vpmId: string;
  mapTilesControlPosition: ControlPosition;

  constructor(options: UnlMapOptions) {
    super({
      ...options,
      style: getStyles("pFlhWNivCejOEWnTKIQf6ZKRWP5avfiANvleJKR0XAY")[0],
      minZoom: options.minZoom ?? ZoomLevel.MIN_ZOOM,
      maxZoom: options.maxZoom ?? ZoomLevel.MAX_ZOOM,
      maplibreLogo: false,
      logoPosition: undefined,
    });

    this.apiKey = options.apiKey;
    this.vpmId = options.vpmId;
    this.mapTilesControlPosition =
      options.mapTilesControlPosition ??
      DEFAULT_TILES_SELECTOR_CONTROL_POSITION;

    if (options.indoorMapsControl) {
      this.addControl(
        new IndoorControl(),
        options.indoorMapsControlPosition ??
          DEFAULT_INDOOR_MAPS_CONTROL_POSITION
      );
    }
    if (options.mapTilesControl) {
      this.addControl(new MapTilesControl(), this.mapTilesControlPosition);
    }
    if (options.draftShapesControl) {
      this.addControl(
        new DraftShapesControl(),
        options.draftShapesControlPosition ??
          DEFAULT_DRAFT_SHAPES_CONTROL_BUTTON
      );
    }
    if (options.gridControl) {
      this.addControl(
        new GridControl(),
        options.gridControlPosition ?? DEFAULT_GRID_CONTROL_POSITION
      );
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
