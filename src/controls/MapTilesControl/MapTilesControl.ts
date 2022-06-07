import Base from "../Base/Base";
import ControlButton from "../GridControl/components/ControlButton";
import { getStyles } from "../../map/styles/here";
import { ControlPosition, StyleSpecification } from "maplibre-gl";
import { getButtonIcon, mapTilesTooltip } from "./mapTilesTooltip";

export interface MapTilesControlOptions {
  position: ControlPosition;
  styles?: StyleSpecification[];
  onChange?: (style: StyleSpecification) => void;
}

export default class MapTilesControl extends Base {
  styles: StyleSpecification[];
  onChange?: (style: StyleSpecification) => void;
  button: ControlButton;
  tooltip: HTMLDivElement;
  position: ControlPosition;
  mapTilesButtons: HTMLButtonElement[];

  constructor(options: MapTilesControlOptions) {
    super();

    this.styles = options?.styles ?? this.defaultOptions;
    this.onChange = options?.onChange;
    this.mapTilesButtons = [];

    this.button = new ControlButton().setIcon(
      //@ts-ignore
      getButtonIcon(this.defaultOptions[0].name)
    );
    this.position = options.position;

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
    this.button.onClick(this.toggleMapTiles);
    this.button.node.style.position = "relative";
    this.button.node.appendChild(this.tooltip);
    this.setTooltipPosition();

    this.addButton(this.button);

    const tooltip = this.tooltip;
    const mapTilesButton = this.button;

    document.addEventListener("click", function (event) {
      //@ts-ignore
      var isClickInsideTooltip = tooltip.contains(event.target);
      //@ts-ignore
      var isClickOnMapTilesButton = mapTilesButton.node.contains(event.target);
      if (!isClickOnMapTilesButton && !isClickInsideTooltip) {
        //@ts-ignore
        tooltip?.style.display = "none";
      }
    });
  }

  get defaultOptions(): any[] {
    return getStyles("pFlhWNivCejOEWnTKIQf6ZKRWP5avfiANvleJKR0XAY");
  }

  toggleMapTiles = () => {
    if (this.tooltip.style.display === "block") {
      this.tooltip.style.display = "none";
    } else {
      this.tooltip.style.display = "block";
    }
  };

  setTooltipPosition = () => {
    switch (this.position) {
      case "bottom-left":
        this.tooltip.style.marginLeft = "40px";
        this.tooltip.style.bottom = "0px";
        this.tooltip.style.left = "0px";
        break;
      case "bottom-right":
        this.tooltip.style.marginRight = "40px";
        this.tooltip.style.bottom = "0px";
        this.tooltip.style.right = "0px";
        break;
      case "top-left":
        this.tooltip.style.marginLeft = "40px";
        this.tooltip.style.top = "0px";
        this.tooltip.style.left = "0px";
        break;
      case "top-right":
        this.tooltip.style.marginRight = "40px";
        this.tooltip.style.top = "0px";
        this.tooltip.style.right = "0px";
        break;
    }
  };

  onAddControl = () => {
    this.insert();
  };

  onRemoveControl = () => {};
}
