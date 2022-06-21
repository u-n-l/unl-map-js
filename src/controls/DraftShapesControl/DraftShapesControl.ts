import { FilterSpecification, MapMouseEvent } from "maplibre-gl";
import MapboxDraw, {
  DrawCreateEvent,
  DrawModeChageEvent,
  DrawUpdateEvent,
} from "@mapbox/mapbox-gl-draw";
import ControlButton from "../components/ControlButton";
import Base from "../Base/Base";
import { DragCircleMode } from "mapbox-gl-draw-circle";
import DrawRectangle from "mapbox-gl-draw-rectangle-mode";
import polygonDraw from "../../icons/ts/PolygonDraw";
import cricleDraw from "../../icons/ts/CricleDraw";
import rectangleDraw from "../../icons/ts/RectangleDraw";
import deleteIcon from "../../icons/ts/DeleteIcon";
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
import { Feature, GeoJsonProperties, Geometry } from "geojson";

export interface DraftShapesControlOptions {}

export default class DraftShapesControl extends Base {
  private polygonButton: ControlButton;
  private circleButton: ControlButton;
  private rectangleButton: ControlButton;
  private deleteButton: ControlButton;
  private draw: MapboxDraw;
  private selectedDraftShapeId?: string;
  private draftShapes: Record[];
  private unlApi?: UnlApi;
  private updatedDraftShape?: {
    id: string;
    feature: Feature<Geometry, GeoJsonProperties>;
  };

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
    this.deleteButton = new ControlButton()
      .setIcon(deleteIcon())
      .onClick(() => {
        this.handleDraftShapeDelete();
      });

    this.selectedDraftShapeId = undefined;
    this.draftShapes = [];
  }

  private initSourcesAndLayers = () => {
    this.map.addSource(DRAFT_SHAPES_SOURCE, draftShapesSource);

    this.map.addLayer(draftShapesFillLayer);
    this.map.addLayer(draftShapesLineLayer);
  };

  private updateDraftShapeSource = (records: Record[]) => {
    const draftShapesSource: maplibregl.GeoJSONSource = this.map.getSource(
      DRAFT_SHAPES_SOURCE
    ) as maplibregl.GeoJSONSource;

    if (draftShapesSource) {
      draftShapesSource.setData(
        featureCollection(
          records.map((record) =>
            polygonFeature(record.geojson.geometry.coordinates, {
              ...record.geojson.properties,
              id: record.recordId,
            })
          )
        )
      );
    }
  };

  private fetchDraftShapes = () => {
    this.unlApi?.recordsApi
      .getAll(this.map.getVpmId(), RecordFeatureType.DRAFT_SHAPE)
      .then((records) => {
        if (records && records.items) {
          this.draftShapes = records.items;
          this.updateDraftShapeSource(this.draftShapes);
        }
      });
  };

  private handleDrawCreate = (event: DrawCreateEvent) => {
    const createdDraftShape = appendDraftShapeFeatureProperties(
      event.features[0]
    );

    this.unlApi?.recordsApi
      .create(this.map.getVpmId(), createdDraftShape)
      .then((value) => {
        if (value) {
          this.draftShapes.push(value);
          this.updateDraftShapeSource(this.draftShapes);
          this.draw.set(featureCollection([]));
        }
      });
  };

  private handleDrawUpdate = (event: DrawUpdateEvent) => {
    this.updatedDraftShape = {
      id: event.features[0].properties?.id,
      feature: appendDraftShapeFeatureProperties({
        geometry: event.features[0].geometry,
        properties: event.features[0].properties,
        type: event.features[0].type,
      }),
    };
  };

  private handleModeChange = (event: DrawModeChageEvent) => {
    if (event.mode === "simple_select" && this.updatedDraftShape) {
      this.unlApi?.recordsApi
        .update(
          this.map.getVpmId(),
          this.updatedDraftShape.id,
          this.updatedDraftShape.feature
        )
        .then((value) => {
          this.map.setFilter(DRAFT_SHAPES_FILL_LAYER, null);
          this.map.setFilter(DRAFT_SHAPES_LINE_LAYER, null);

          this.draftShapes = this.draftShapes.map((draftShape) =>
            draftShape.recordId === value.recordId ? value : draftShape
          );

          this.updateDraftShapeSource(this.draftShapes);
          this.draw.set(featureCollection([]));
          this.selectedDraftShapeId = undefined;
          this.updatedDraftShape = undefined;
        });
      this.updatedDraftShape = undefined;
    }

    if (event.mode === "direct_select") {
      this.deleteButton.node.style.display = "flex";
    } else {
      this.deleteButton.node.style.display = "none";
    }
  };

  private handleDraftShapeDelete = () => {
    const selectedDraftShapeId = this.selectedDraftShapeId;

    this.unlApi?.recordsApi
      .delete(this.map.getVpmId(), selectedDraftShapeId!)
      .then((value) => {
        this.map.setFilter(DRAFT_SHAPES_FILL_LAYER, null);
        this.map.setFilter(DRAFT_SHAPES_LINE_LAYER, null);

        const deletedDraftShapeIndex = this.draftShapes.findIndex(
          (draftShape) => draftShape.recordId === value.recordId
        );

        this.draftShapes.splice(deletedDraftShapeIndex, 1);

        this.updateDraftShapeSource(this.draftShapes);
        this.draw.set(featureCollection([]));
        this.selectedDraftShapeId = undefined;
        this.updatedDraftShape = undefined;
        this.deleteButton.node.style.display = "none";
      });
  };

  private handleDraftShapeClick = (e: MapMouseEvent) => {
    //@ts-ignore
    this.selectedDraftShapeId = e.features[0].properties.id;
    const filteredId = this.selectedDraftShapeId ?? 0;

    const filterExpression = [
      "!=",
      ["get", "id"],
      filteredId,
    ] as FilterSpecification;

    this.map.setFilter(DRAFT_SHAPES_FILL_LAYER, filterExpression);
    this.map.setFilter(DRAFT_SHAPES_LINE_LAYER, filterExpression);

    const selectedDraftShape = this.draftShapes.find(
      (shape) => shape.recordId === filteredId
    );

    //@ts-ignore
    this.draw.set(
      featureCollection([
        polygonFeature(selectedDraftShape?.geojson.geometry.coordinates, {
          ...selectedDraftShape?.geojson.properties,
          id: selectedDraftShape?.recordId,
        }),
      ])
    );
    this.draw.changeMode("simple_select");
  };

  private initDrawControl = () => {
    //@ts-ignore
    this.map.addControl(this.draw, "top-right");

    this.map.on("draw.create", this.handleDrawCreate);
    this.map.on("draw.update", this.handleDrawUpdate);
    this.map.on("draw.modechange", this.handleModeChange);

    this.map.on("click", DRAFT_SHAPES_FILL_LAYER, this.handleDraftShapeClick);
    this.map.on("click", DRAFT_SHAPES_LINE_LAYER, this.handleDraftShapeClick);
  };

  private handleMapLoad = () => {
    this.initSourcesAndLayers();
    this.fetchDraftShapes();
    this.initDrawControl();
  };

  onAddControl = () => {
    this.unlApi = new UnlApi({ apiKey: this.map.getApiKey() });

    this.addButton(this.polygonButton);
    this.addButton(this.circleButton);
    this.addButton(this.rectangleButton);
    this.addButton(this.deleteButton);
    this.deleteButton.node.style.display = "none";

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
