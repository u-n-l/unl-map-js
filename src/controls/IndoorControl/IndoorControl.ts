import ControlButton from "../../ui/buttons/ControlButton/ControlButton";
import Base from "../Base/Base";

export interface IndoorControlOptions {}

export default class IndoorControl extends Base {
  indoorVisibilityButton: ControlButton;
  isIndoorVisible: boolean;

  constructor(options?: IndoorControlOptions) {
    super();
    this.indoorVisibilityButton = new ControlButton().setText("I");
    this.isIndoorVisible = true;
  }

  discoverIndoorMaps = () => {};

  showIndoorMaps = () => {
    this.isIndoorVisible = true;
    this.discoverIndoorMaps();
    this.map.on("moveend", this.discoverIndoorMaps);
  };

  hideIndoorMaps = () => {
    this.isIndoorVisible = false;
    this.map.off("moveend", this.discoverIndoorMaps);
  };

  toggleIndoorVisibility = () => {
    if (this.isIndoorVisible) {
      this.showIndoorMaps();
    } else {
      this.hideIndoorMaps();
    }
  };

  insert = () => {
    this.indoorVisibilityButton.onClick(this.toggleIndoorVisibility);
    this.addButton(this.indoorVisibilityButton);
  };

  onAddControl = () => {
    this.insert();
  };

  onRemoveControl = () => {};
}
