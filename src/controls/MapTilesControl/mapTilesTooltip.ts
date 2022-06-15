import { StyleSpecification } from "maplibre-gl";
import baseTiles from "../../icons/ts/BaseTilesIcon";
import vectorialTiles from "../../icons/ts/VectorialTilesIcon";
import satelliteTiles from "../../icons/ts/SatelliteTilesIcon";
import terrainTiles from "../../icons/ts/TerrainTilesIcon";
import trafficTiles from "../../icons/ts/TrafficTilesIcon";

const VECTORIAL_LABEL = "HERE Berlin";
const SATELLITE_LABEL = "satellite";
const TRAFFIC_LABEL = "traffic";
const TERRAIN_LABEL = "terrain";
const BASE_LABEL = "Base map";

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
      return baseTiles();
    default:
      vectorialTiles();
  }
};

export const getButtonIcon = (styleName: string) => {
  switch (styleName) {
    case VECTORIAL_LABEL:
      return vectorialTiles();
    case SATELLITE_LABEL:
      return satelliteTiles();
    case TERRAIN_LABEL:
      return terrainTiles();
    case TRAFFIC_LABEL:
      return trafficTiles();
    case BASE_LABEL:
      return baseTiles();
    default:
      vectorialTiles();
  }
};

export const mapTilesTooltip = (
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

    const buttonDescription = document.createElement("p");
    buttonDescription.classList.add(
      "mapbox-control-map-tiles-tooltip-button-description"
    );
    //@ts-ignore
    buttonDescription.innerHTML = style.label;

    buttonContainer.appendChild(buttonDescription);

    tooltipContent.appendChild(buttonContainer);
  });

  root.appendChild(tooltipContent);

  return root;
};
