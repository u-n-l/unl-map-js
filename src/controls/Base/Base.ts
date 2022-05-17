import UnlMap from "../../map/UnlMap";
import ControlButton from "../../ui/buttons/ControlButton/ControlButton";

class Base {
  node: HTMLDivElement;
  //@ts-ignore
  map: UnlMap;

  constructor() {
    this.node = document.createElement("div");
    this.node.classList.add("mapboxgl-ctrl");
    this.node.classList.add("mapboxgl-ctrl-group");
    this.node.classList.add("mapbox-control");
  }

  onAddControl = () => {
    //to be extended
  };

  onRemoveControl = () => {
    //to be extended
  };

  addButton = (...buttons: ControlButton[]) => {
    buttons.forEach((button) => this.node.appendChild(button.node));
  };

  addClassName = (className: string) => {
    this.node.classList.add(className);
  };

  removeClassName = (className: string) => {
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
