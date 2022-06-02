import Base from "../Base/Base";
import ControlButton from "../GridControl/components/ControlButton";
import { getStyles } from "../../map/styles/here";
import { StyleSpecification } from "maplibre-gl";
import mapTilesTooltip, { getButtonIcon } from "./mapTilesTooltip";

export interface MapTilesControlOptions {
  styles?: StyleSpecification[];
  onChange?: (style: StyleSpecification) => void;
}

export default class MapTilesControl extends Base {
  styles: StyleSpecification[];
  onChange?: (style: StyleSpecification) => void;
  button: ControlButton;
  tooltip: HTMLDivElement;
  mapTilesButtons: HTMLButtonElement[];

  constructor(options?: MapTilesControlOptions) {
    super();

    this.styles = options?.styles ?? this.defaultOptions;
    this.onChange = options?.onChange;
    this.mapTilesButtons = [];

    this.button = new ControlButton().setIcon(
      //@ts-ignore
      getButtonIcon(this.defaultOptions[0].name)
    );

    this.tooltip = mapTilesTooltip(
      this.styles,
      (style) => {
        this.map.setStyle(style);
        //@ts-ignore
        this.button.setIcon(getButtonIcon(style.name));
      },
      this.mapTilesButtons
    );
  }

  insert() {
    this.button.onClick(this.showMapTiles);
    this.addButton(this.button);

    this.map.getContainer().appendChild(this.tooltip);
  }

  get defaultOptions(): any[] {
    return getStyles("pFlhWNivCejOEWnTKIQf6ZKRWP5avfiANvleJKR0XAY");
  }

  showMapTiles = () => {
    this.tooltip.style.display = "block";
  };

  onAddControl = () => {
    this.insert();
  };

  onRemoveControl = () => {};
}
