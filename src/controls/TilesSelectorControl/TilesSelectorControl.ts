import Base from "../Base/Base";
import ControlButton from "../components/ControlButton/ControlButton";
import {
  getButtonIcon,
  mapTilesTooltip,
  TOOLTIP_MARGIN,
} from "./components/TilesSelectorTooltip/tilesSelectorTooltip";
import { getStyle, MapTiles } from "./styles/MapTiles";

export interface TilesSelectorControlOptions {
  tiles: MapTiles[];
  displayControlsDefault?: boolean;
}

export const TILES_DEFAULT_OPTIONS: MapTiles[] = [
  "rich",
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

  constructor(options: TilesSelectorControlOptions) {
    super();

    this.displayControlsDefault =
      options?.displayControlsDefault !== undefined
        ? options.displayControlsDefault
        : true;
    this.mapTilesButtons = [];
    this.tiles = options.tiles;

    this.button = new ControlButton().setIcon(
      //@ts-ignore
      getButtonIcon(this.tiles[0])
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

    this.setStyle(this.tiles[0]);
  };

  private adjustTooltipPosition = () => {
    const buttonRect = this.button.node.getBoundingClientRect();
    const tooltipPosition = `${buttonRect.width + TOOLTIP_MARGIN}px`;

    if (buttonRect.x > window.innerWidth / 2) {
      this.tooltip.style.right = tooltipPosition;
    } else {
      this.tooltip.style.left = tooltipPosition;
    }

    if (buttonRect.y > window.innerHeight / 2) {
      this.tooltip.style.bottom = "0";
    } else {
      this.tooltip.style.top = "0";
    }
  };

  private toggleMapTiles = () => {
    if (this.tooltip.style.display === "block") {
      this.tooltip.style.display = "none";
    } else {
      this.tooltip.style.display = "block";
      this.adjustTooltipPosition();
    }
  };

  setStyle = (style: MapTiles) => {
    const styleFile = getStyle(style, this.map.getEnv());

    //@ts-ignore
    this.map.setStyle(styleFile);
    this.map.setCurrentTilesOption(style);
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
