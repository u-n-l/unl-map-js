import baseTiles from "../../../../icons/ts/BaseTilesIcon";
import vectorialTiles from "../../../../icons/ts/VectorialTilesIcon";
import satelliteTiles from "../../../../icons/ts/SatelliteTilesIcon";
import terrainTiles from "../../../../icons/ts/TerrainTilesIcon";
import trafficTiles from "../../../../icons/ts/TrafficTilesIcon";
import { MapTiles } from "../../../../Map/styles/MapTiles";

export const getButtonIcon = (tiles: MapTiles) => {
  switch (tiles) {
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
  tiles: MapTiles[],
  onChange: (tiles: MapTiles) => void,
  buttons: HTMLButtonElement[]
) => {
  const root = document.createElement("div");
  root.classList.add("mapbox-control-tiles-selector-tooltip-root");
  root.setAttribute("id", "tiles-selector-tooltip");

  const tooltipContent = document.createElement("div");
  tooltipContent.classList.add("mapbox-control-tiles-selector-tooltip-content");

  tiles.forEach((tiles) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add(
      "mapbox-control-tiles-selector-tooltip-button-container"
    );

    const button = document.createElement("button");

    //@ts-ignore
    button.appendChild(getButtonIcon(tiles));
    button.classList.add("mapbox-control-tiles-selector-tooltip-button");
    button.onclick = () => {
      onChange(tiles);
    };
    buttons.push(button);

    buttonContainer.appendChild(button);

    const buttonDescription = document.createElement("p");
    buttonDescription.classList.add(
      "mapbox-control-tiles-selector-tooltip-button-description"
    );

    buttonDescription.innerHTML = tiles;
    buttonDescription.style.textTransform = "capitalize";

    buttonContainer.appendChild(buttonDescription);

    tooltipContent.appendChild(buttonContainer);
  });

  root.appendChild(tooltipContent);

  return root;
};
