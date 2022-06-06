import { StyleSpecification } from "maplibre-gl";
import defaultIcon from "../../icons/ts/DefaultTiles";
import vectorialTiles from "../../icons/ts/VectorialTiles";
import satelliteTiles from "../../icons/ts/SatelliteTiles";
import terrainTiles from "../../icons/ts/TerrainTiles";
import trafficTiles from "../../icons/ts/TrafficTiles";

const getStyleIcon = (index: number) => {
  switch (index) {
    case 0:
      return vectorialTiles();
    case 1:
      return satelliteTiles();
    case 2:
      return terrainTiles();
    case 3:
      return trafficTiles();
    case 4:
      return defaultIcon();
    default:
      vectorialTiles();
  }
};

export const getButtonIcon = (styleName: string) => {
  switch (styleName) {
    case "HERE Berlin":
      return vectorialTiles();
    case "satellite":
      return satelliteTiles();
    case "terrain":
      return terrainTiles();
    case "traffic":
      return trafficTiles();
    case "Base map":
      return defaultIcon();
    default:
      vectorialTiles();
  }
};

const mapTilesTooltip = (
  styles: StyleSpecification[],
  onChange: (style: StyleSpecification) => void,
  buttons: HTMLButtonElement[]
) => {
  const root = document.createElement("div");
  root.classList.add("mapbox-control-map-tiles-tooltip-root");
  root.setAttribute("id", "map-tiles-tooltip");

  const tooltipContent = document.createElement("div");
  tooltipContent.classList.add("mapbox-control-map-tiles-tooltip-content");

  styles.forEach((style) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add(
      "mapbox-control-map-tiles-tooltip-button-container"
    );

    const button = document.createElement("button");

    //@ts-ignore
    button.appendChild(getStyleIcon(styles.indexOf(style)));
    button.classList.add("mapbox-control-map-tiles-tooltip-button");
    button.onclick = () => {
      onChange(style);
    };
    buttons.push(button);

    buttonContainer.appendChild(button);
    //@ts-ignore
    buttonContainer.appendChild(document.createTextNode(style.label));

    tooltipContent.appendChild(buttonContainer);
  });

  root.appendChild(tooltipContent);

  return root;
};

export default mapTilesTooltip;
