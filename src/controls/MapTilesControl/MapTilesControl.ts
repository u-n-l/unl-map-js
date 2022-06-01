import Base from "../Base/Base";
import ControlButton from "../GridControl/components/ControlButton";
import { getStyles } from "../../map/styles/here";
import { StyleSpecification } from "maplibre-gl";

export interface MapTilesControlOptions {
  styles?: StyleSpecification[];
  onChange?: (style: StyleSpecification) => void;
}

export default class MapTilesControl extends Base {
  styles: StyleSpecification[];
  onChange?: (style: StyleSpecification) => void;
  buttons: ControlButton[];

  constructor(options?: MapTilesControlOptions) {
    super();

    this.styles = options?.styles ?? this.defaultOptions;
    this.onChange = options?.onChange;
    this.buttons = [];
  }

  insert() {
    this.styles.forEach((style) => {
      const button = new ControlButton();
      //@ts-ignore
      button.setText(style.label);
      button.onClick(() => {
        if (button.isActive()) return;
        this.map.setStyle(style);
        if (this.onChange) this.onChange(style);
      });
      this.buttons.push(button);
      this.addButton(button);
    });

    this.map.on("styledata", () => {
      this.buttons.forEach((button) => {
        button.setActive(false);
      });
      const styleNames = this.styles.map((style) => style.name);
      const styleName = this.map.getStyle().name;
      if (!styleName) throw Error("style must have name");
      const currentStyleIndex = styleNames.indexOf(styleName);
      if (currentStyleIndex !== -1) {
        const currentButton = this.buttons[currentStyleIndex];
        currentButton.setActive(true);
      }
    });
  }

  get defaultOptions(): any[] {
    return getStyles("pFlhWNivCejOEWnTKIQf6ZKRWP5avfiANvleJKR0XAY");
  }

  onAddControl = () => {
    this.insert();
  };

  onRemoveControl = () => {
    console.log("a");
  };
}
