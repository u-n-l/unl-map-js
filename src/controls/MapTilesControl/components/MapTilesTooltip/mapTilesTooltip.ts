import baseTiles from "../../../../icons/ts/BaseTilesIcon";
import vectorialTiles from "../../../../icons/ts/VectorialTilesIcon";
import satelliteTiles from "../../../../icons/ts/SatelliteTilesIcon";
import terrainTiles from "../../../../icons/ts/TerrainTilesIcon";
import trafficTiles from "../../../../icons/ts/TrafficTilesIcon";
import { MapTilesStyle } from "../../../../Map/styles/MapTilesStyle";

export const getButtonIcon = (style: MapTilesStyle) => {
  switch (style) {
    case "vectorial":
      return vectorialTiles();
    case "satellite":
      return satelliteTiles();
    case "terrain":
      return terrainTiles();
    case "traffic":
      return trafficTiles();
    case "base":
      return baseTiles();
    default:
      vectorialTiles();
  }
};

export const mapTilesTooltip = (
  styles: MapTilesStyle[],
  onChange: (style: MapTilesStyle) => void,
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
    button.appendChild(getButtonIcon(style));
    button.classList.add("mapbox-control-map-tiles-tooltip-button");
    button.onclick = () => {
      onChange(style);
    };
    buttons.push(button);

    buttonContainer.appendChild(button);

    const buttonDescription = document.createElement("p");
    buttonDescription.classList.add(
      "mapbox-control-map-tiles-tooltip-button-description"
    );

    buttonDescription.innerHTML = style;
    buttonDescription.style.textTransform = "capitalize";

    buttonContainer.appendChild(buttonDescription);

    tooltipContent.appendChild(buttonContainer);
  });

  root.appendChild(tooltipContent);

  return root;
};
