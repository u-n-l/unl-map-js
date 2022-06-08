import { MapMouseEvent } from "maplibre-gl";
import MapboxDraw, { DrawCreateEvent } from "@mapbox/mapbox-gl-draw";
import ControlButton from "../GridControl/components/ControlButton";
import Base from "../Base/Base";
import { DragCircleMode } from "mapbox-gl-draw-circle";
import DrawRectangle from "mapbox-gl-draw-rectangle-mode";
import polygonDraw from "../../icons/ts/PolygonDraw";
import cricleDraw from "../../icons/ts/CricleDraw";
import rectangleDraw from "../../icons/ts/RectangleDraw";
import { draftShapesSource, DRAFT_SHAPES_SOURCE } from "./sources";
import {
  draftShapesFillLayer,
  draftShapesLineLayer,
  DRAFT_SHAPES_FILL_LAYER,
  DRAFT_SHAPES_LINE_LAYER,
} from "./layers";
import UnlApi from "../../api/UnlApi";
import { Record } from "../../api/records/models/Record";
import { featureCollection, polygonFeature } from "../Base/helpers";
import { RecordFeatureType } from "../../api/records/models/RecordFeatureType";
import { appendDraftShapeFeatureProperties } from "./helpers";

export interface DraftShapesControlOptions {}

export default class DraftShapesControl extends Base {
  polygonButton: ControlButton;
  circleButton: ControlButton;
  rectangleButton: ControlButton;
  draw: MapboxDraw;

  constructor(options?: DraftShapesControlOptions) {
    super();

    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      modes: {
        ...MapboxDraw.modes,
        draw_circle: DragCircleMode,
        draw_rectangle: DrawRectangle,
      },
    });

    this.polygonButton = new ControlButton()
      .setIcon(polygonDraw())
      .onClick(() => {
        this.draw.changeMode("draw_polygon");
      });
    this.circleButton = new ControlButton()
      .setIcon(cricleDraw())
      .onClick(() => {
        //@ts-ignore
        this.draw.changeMode("draw_circle");
      });
    this.rectangleButton = new ControlButton()
      .setIcon(rectangleDraw())
      .onClick(() => {
        //@ts-ignore
        this.draw.changeMode("draw_rectangle");
      });
  }

  initSourcesAndLayers = () => {
    this.map.addSource(DRAFT_SHAPES_SOURCE, draftShapesSource);

    this.map.addLayer(draftShapesFillLayer);
    this.map.addLayer(draftShapesLineLayer);
  };

  updateDraftShapeSource = (records: Record[]) => {
    const draftShapesSource: maplibregl.GeoJSONSource = this.map.getSource(
      DRAFT_SHAPES_SOURCE
    ) as maplibregl.GeoJSONSource;

    if (draftShapesSource) {
      draftShapesSource.setData(
        featureCollection(
          records.map((record) =>
            polygonFeature(record.geojson.geometry.coordinates)
          )
        )
      );
    }
  };

  fetchDraftShapes = () => {
    const unlApi = new UnlApi({ apiKey: this.map.getApiKey() });

    unlApi.recordsApi
      .getAll(this.map.getVpmId(), RecordFeatureType.DRAFT_SHAPE)
      .then((records) => {
        if (records && records.items) {
          this.updateDraftShapeSource(records.items);
        }
      });
  };

  handleDrawCreate = (event: DrawCreateEvent) => {
    const unlApi = new UnlApi({ apiKey: this.map.getApiKey() });

    const createdDraftShape = appendDraftShapeFeatureProperties(
      event.features[0]
    );

    unlApi.recordsApi.create(this.map.getVpmId(), createdDraftShape);
    this.draw.set(featureCollection([]));
    this.fetchDraftShapes();
  };

  handleDraftShapeClick = (e: MapMouseEvent) => {
    //@ts-ignore
    this.draw.set(featureCollection([e.features[0]]));
    this.draw.changeMode("simple_select");
  };

  initDrawControl = () => {
    //@ts-ignore
    this.map.addControl(this.draw, "top-right");

    this.map.on("draw.create", this.handleDrawCreate);

    this.map.on("click", DRAFT_SHAPES_FILL_LAYER, this.handleDraftShapeClick);
    this.map.on("click", DRAFT_SHAPES_LINE_LAYER, this.handleDraftShapeClick);
  };

  handleMapLoad = () => {
    this.initSourcesAndLayers();
    this.fetchDraftShapes();
    this.initDrawControl();
  };

  onAddControl = () => {
    this.addButton(this.polygonButton);
    this.addButton(this.circleButton);
    this.addButton(this.rectangleButton);

    this.map.on("load", this.handleMapLoad);
  };

  onRemoveControl = () => {
    //@ts-ignore
    this.map.removeControl(this.draw);

    this.map.off("click", DRAFT_SHAPES_FILL_LAYER, this.handleDraftShapeClick);
    this.map.off("click", DRAFT_SHAPES_LINE_LAYER, this.handleDraftShapeClick);
    this.map.off("load", this.handleMapLoad);

    this.map.removeLayer(DRAFT_SHAPES_FILL_LAYER);
    this.map.removeLayer(DRAFT_SHAPES_LINE_LAYER);
    this.map.removeSource(DRAFT_SHAPES_SOURCE);
  };
}
