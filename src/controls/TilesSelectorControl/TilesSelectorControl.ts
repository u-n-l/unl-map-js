import Base from "../Base/Base";
import ControlButton from "../components/ControlButton/ControlButton";
import {
  getButtonIcon,
  mapTilesTooltip,
} from "./components/TilesSelectorTooltip/tilesSelectorTooltip";
import { getStyle, MapTiles } from "./styles/MapTiles";

export interface TilesSelectorControlOptions {
  displayControlsDefault?: boolean;
  tiles?: MapTiles[];
}

const TILES_DEFAULT_OPTIONS: MapTiles[] = [
  "vectorial",
  "satellite",
  "terrain",
  "traffic",
  "base",
];

export default class TilesSelectorControl extends Base {
  private displayControlsDefault: boolean;
  private tiles: MapTiles[];
  private button: ControlButton;
  private tooltip: HTMLDivElement;
  private mapTilesButtons: HTMLButtonElement[];

  constructor(options?: TilesSelectorControlOptions) {
    super();

    this.displayControlsDefault =
      options?.displayControlsDefault !== undefined
        ? options.displayControlsDefault
        : true;
    this.tiles = options?.tiles ?? TILES_DEFAULT_OPTIONS;
    this.mapTilesButtons = [];

    this.button = new ControlButton().setIcon(
      //@ts-ignore
      getButtonIcon(TILES_DEFAULT_OPTIONS[0])
    );

    this.tooltip = mapTilesTooltip(
      this.tiles,
      (style) => {
        this.setStyle(style);
        //@ts-ignore
        this.button.setIcon(getButtonIcon(style));
      },
      this.mapTilesButtons
    );
  }

  private insert = () => {
    this.button.onClick(this.toggleMapTiles);
    this.button.node.style.position = "relative";
    this.button.node.appendChild(this.tooltip);
    this.setTooltipPosition();

    this.addButton(this.button);
    const tooltip = this.tooltip;
    const button = this.button;

    document.addEventListener("click", (event: MouseEvent) => {
      //@ts-ignore
      var isClickInsideTooltip = tooltip.contains(event.target);
      //@ts-ignore
      var isClickOnMapTilesButton = button.node.contains(event.target);
      if (!isClickOnMapTilesButton && !isClickInsideTooltip) {
        //@ts-ignore
        tooltip?.style.display = "none";
      }
    });
  };

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

  setStyle = (style: MapTiles) => {
    const styleFile = getStyle(style);
    //@ts-ignore
    this.map.setStyle(styleFile);
  };

  protected onAddControl = () => {
    if (this.displayControlsDefault) {
      this.insert();
    }
  };

  protected onRemoveControl = () => {
    // document.removeEventListener("click", this.handleClickAway);
  };
}
