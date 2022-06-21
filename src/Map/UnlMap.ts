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
import { getStyle } from "./styles/MapTilesStyle";
import ZoomLevel from "./zoomLevels";

const DEFAULT_GRID_CONTROL_POSITION = "top-right";
const DEFAULT_INDOOR_MAPS_CONTROL_POSITION = "top-right";
const DEFAULT_TILES_SELECTOR_CONTROL_POSITION = "top-left";
const DEFAULT_DRAFT_SHAPES_CONTROL_BUTTON = "top-left";

export type UnlMapOptions = {
  apiKey: string;
  vpmId: string;
  gridControl?: boolean;
  indoorMapsControl?: boolean;
  mapTilesControl?: boolean;
  displayMapTilesControlDefault?: boolean;
  draftShapesControl?: boolean;
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
  displayMapTilesControlDefault: boolean;

  constructor(options: UnlMapOptions) {
    super({
      ...options,
      //@ts-ignore
      style: getStyle(),
      minZoom: options.minZoom ?? ZoomLevel.MIN_ZOOM,
      maxZoom: options.maxZoom ?? ZoomLevel.MAX_ZOOM,
      maplibreLogo: false,
      logoPosition: undefined,
    });

    this.apiKey = options.apiKey;
    this.vpmId = options.vpmId;
    this.mapTilesControlPosition = DEFAULT_TILES_SELECTOR_CONTROL_POSITION;
    this.displayMapTilesControlDefault =
      options.displayMapTilesControlDefault ?? true;

    if (options.indoorMapsControl) {
      this.addControl(
        new IndoorControl(),
        DEFAULT_INDOOR_MAPS_CONTROL_POSITION
      );
    }
    if (options.mapTilesControl) {
      this.addControl(
        new MapTilesControl({
          displayControlsDefault: this.displayMapTilesControlDefault,
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

  getDisplayMapTilesControlsDefault = () => {
    return this.displayMapTilesControlDefault;
  };
}

export default UnlMap;
