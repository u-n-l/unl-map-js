import UnlMap from "../../map/UnlMap";
import ControlButton from "../components/ControlButton/ControlButton";

class Base {
  protected node: HTMLDivElement;
  //@ts-ignore
  protected map: UnlMap;

  constructor() {
    this.node = document.createElement("div");
    this.node.classList.add("mapboxgl-ctrl");
    this.node.classList.add("mapboxgl-ctrl-group");
    this.node.classList.add("mapbox-control");
  }

  protected onAddControl = () => {
    //to be extended
  };

  protected onRemoveControl = () => {
    //to be extended
  };

  protected addButton = (...buttons: ControlButton[]) => {
    buttons.forEach((button) => this.node.appendChild(button.node));
  };

  protected removeButton = (...buttons: ControlButton[]) => {
    buttons.forEach((button) => this.node.removeChild(button.node));
  };

  protected addClassName = (className: string) => {
    this.node.classList.add(className);
  };

  protected removeClassName = (className: string) => {
    this.node.classList.remove(className);
  };

  onAdd = (map: UnlMap) => {
    this.map = map;
    this.onAddControl();

    return this.node;
  };

  onRemove = () => {
    this.onRemoveControl();
    this.node.parentNode!.removeChild(this.node);
  };
}

export default Base;
