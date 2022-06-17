import Base from "../Base/Base";
import ControlButton from "../components/ControlButton";
import { getButtonIcon, mapTilesTooltip } from "./mapTilesTooltip";
import { getStyle, MapTilesStyle } from "../../Map/styles/MapTilesStyle";

export interface MapTilesControlOptions {
  displayControlsDefault: boolean;
  styles?: MapTilesStyle[];
}

export default class MapTilesControl extends Base {
  private displayControlsDefault: boolean;
  private styles: MapTilesStyle[];
  private button: ControlButton;
  private tooltip: HTMLDivElement;
  private mapTilesButtons: HTMLButtonElement[];

  constructor(options: MapTilesControlOptions) {
    super();

    this.displayControlsDefault = options.displayControlsDefault;
    this.styles = options?.styles ?? this.defaultOptions;
    this.mapTilesButtons = [];

    this.button = new ControlButton().setIcon(
      //@ts-ignore
      getButtonIcon(this.defaultOptions[0])
    );

    this.tooltip = mapTilesTooltip(
      this.styles,
      (style) => {
        this.setStyle(style);
        //@ts-ignore
        this.button.setIcon(getButtonIcon(style));
      },
      this.mapTilesButtons
    );
  }

  private insert() {
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

  private get defaultOptions(): MapTilesStyle[] {
    return ["vectorial", "satellite", "terrain", "traffic", "base"];
  }

  private toggleMapTiles = () => {
    if (this.tooltip.style.display === "block") {
      this.tooltip.style.display = "none";
    } else {
      this.tooltip.style.display = "block";
    }
  };

  private setTooltipPosition = () => {
    switch (this.map.getMapTilesControlPosition()) {
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

  setStyle = (style: MapTilesStyle) => {
    const styleFile = getStyle(style);
    //@ts-ignore
    this.map.setStyle(styleFile);
  };

  protected onAddControl = () => {
    if (this.displayControlsDefault) {
      this.insert();
    }
  };

  protected onRemoveControl = () => {};
}
