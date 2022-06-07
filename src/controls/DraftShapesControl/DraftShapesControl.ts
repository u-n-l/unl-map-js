import MapboxDraw from "@mapbox/mapbox-gl-draw";
import ControlButton from "../GridControl/components/ControlButton";
import Base from "../Base/Base";
import { DragCircleMode } from "mapbox-gl-draw-circle";
import DrawRectangle from "mapbox-gl-draw-rectangle-mode";
import polygonDraw from "../../icons/ts/PolygonDraw";
import cricleDraw from "../../icons/ts/CricleDraw";
import rectangleDraw from "../../icons/ts/RectangleDraw";

export interface DraftShapesControlOptions {}

export default class DraftShapesControl extends Base {
  polygonButton: ControlButton;
  circleButton: ControlButton;
  rectangleButton: ControlButton;
  lineButton: ControlButton;
  pointButton: ControlButton;
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
    this.lineButton = new ControlButton().setText("L").onClick(() => {
      this.draw.changeMode("draw_line_string");
    });
    this.pointButton = new ControlButton().setText("P").onClick(() => {
      this.draw.changeMode("draw_point");
    });
  }

  insert = () => {
    this.addButton(this.polygonButton);
    this.addButton(this.circleButton);
    this.addButton(this.rectangleButton);
    this.addButton(this.lineButton);
    this.addButton(this.pointButton);
  };

  onAddControl = () => {
    this.insert();

    //@ts-ignore
    this.map.addControl(this.draw, "top-right");
  };

  onRemoveControl = () => {};
}
