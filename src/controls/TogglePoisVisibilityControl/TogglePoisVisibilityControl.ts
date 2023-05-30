import showPoisIcon from "../../icons/ts/ShowPoisIcon";
import hidePoisIcon from "../../icons/ts/HidePoisIcon";
import Base from "../Base/Base";
import ControlButton from "../components/ControlButton/ControlButton";
import { isVectorialIncluded } from "../TilesSelectorControl/helpers";
import ZoomLevel from "../../map/models/ZoomLevel";
import { HERE_POIS_LAYERS } from "./layers";

export default class TogglePoisVisibilityControl extends Base {
  private button?: ControlButton;
  private arePoisVisible: boolean;

  constructor() {
    super();

    this.arePoisVisible = false;
  }

  private handleControlVisibility = () => {
    if (!isVectorialIncluded([this.map.currentTile])) {
      this.removeAndHideLayers();
      this.hideFeature();
      return;
    } else {
      if (this.arePoisVisible) {
        this.addAndShowLayers();
      }
    }

    const zoomLevel = this.map.getZoom();
    if (zoomLevel >= ZoomLevel.MIN_GRID_ZOOM_GEOHASH_LENGTH_7) {
      this.showFeature();
      this.arePoisVisible && this.enablePoisVisibility();
    } else {
      this.hideFeature();
    }
  };

  showFeature = () => {
    if (
      !this.button ||
      !this.button.node ||
      !this.node.contains(this.button.node)
    ) {
      this.button = new ControlButton().setIcon(hidePoisIcon());
      this.button.node.classList.add("control-button-disabled");
      this.button.onClick(this.togglePoisVisibility);
      this.addButton(this.button);
    }
  };

  hideFeature = () => {
    if (this.button && this.node.contains(this.button.node)) {
      this.removeButton(this.button);
    }
  };

  private addAndShowLayers = () => {
    HERE_POIS_LAYERS.forEach((currentLayer) => {
      !this.map.getLayer(currentLayer.id) && this.map.addLayer(currentLayer);
      this.map.getLayer(currentLayer.id).visibility = "visible";
    });
  };

  private removeAndHideLayers = () => {
    HERE_POIS_LAYERS.forEach((currentLayer) => {
      if (this.map.getLayer(currentLayer.id)) {
        this.map.removeLayer(currentLayer.id);
      }
    });
  };

  private enablePoisVisibility = () => {
    if (!this.button) {
      return;
    }

    this.arePoisVisible = true;
    this.button.setIcon(showPoisIcon());
    this.button.node.classList.remove("control-button-disabled");
    this.button.node.classList.add("control-button-enabled");
  };

  private disablePoisVisibility = () => {
    if (!this.button) {
      return;
    }

    this.arePoisVisible = false;
    this.button.setIcon(hidePoisIcon());
    this.button.node.classList.remove("control-button-enabled");
    this.button.node.classList.add("control-button-disabled");
  };

  private togglePoisVisibility = () => {
    if (this.arePoisVisible) {
      this.removeAndHideLayers();
      this.disablePoisVisibility();
    } else {
      this.addAndShowLayers();
      this.enablePoisVisibility();
    }
  };

  private insert = () => {
    this.map.on("zoomend", this.handleControlVisibility);
    this.map.on("styledata", this.handleControlVisibility);
  };

  protected onAddControl = () => {
    this.insert();
  };

  protected onRemoveControl = () => {
    this.map.off("zoom", this.handleControlVisibility);
    this.map.off("styledata", this.handleControlVisibility);

    this.hideFeature();
  };
}
