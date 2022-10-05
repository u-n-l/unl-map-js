import { AttributionControl, IControl } from "maplibre-gl";
import { Copyright } from "../../api/tiles/models/Copyright";
import { SourceId } from "../../api/tiles/models/SourceId";
import UnlApi from "../../api/UnlApi";
import Base from "../Base/Base";
import {
  DEFAULT_ATTRIBUTION,
  getCustomAttribution,
  getSurfaceTile,
  getTileType,
} from "./helpers";

export default class CustomAttributionControl extends Base {
  private attributionControl: IControl;
  private unlApi?: UnlApi;
  private copyrights: { [style: string]: Copyright[] };

  constructor() {
    super();
    this.copyrights = {};
    this.attributionControl = new AttributionControl({
      customAttribution: DEFAULT_ATTRIBUTION,
    });
  }

  handleMoveEnd = () => {
    // this.map._controls.forEach((control) => {
    //   //@ts-ignore
    //   if (control.options && control.options.customAttribution) {
    //     const mapBounds = this.map.getBounds();
    //     const zoom = this.map.getZoom();
    //     const newAttribution = getCustomAttribution(
    //       mapBounds,
    //       zoom,
    //       this.copyrights[String(this.map.getCurrentTilesOption)]
    //     );

    //     console.log("COPYRIGHT:", newAttribution);

    //     //@ts-ignore
    //     control.options.customAttribution = newAttribution;
    //   }
    // });

    console.log("COPYRIGHT: ", this.attributionControl);
    const mapBounds = this.map.getBounds();
    const zoom = this.map.getZoom();
    const newAttribution = getCustomAttribution(
      mapBounds,
      zoom,
      this.copyrights[String(this.map.getCurrentTilesOption)]
    );

    console.log("COPYRIGHT:", newAttribution);

    //@ts-ignore
    this.attributionControl.options.customAttribution = newAttribution;
    //@ts-ignore
    this.attributionControl._attribHTML = newAttribution;
  };

  updateCopyrights = () => {
    const currentTilesOption = this.map.getCurrentTilesOption();

    if (!this.copyrights[currentTilesOption]) {
      const tileType = getTileType(currentTilesOption);
      const surfaceTile = getSurfaceTile(currentTilesOption);

      const copyrights = this.unlApi?.tilesApi
        .getCopyrights(SourceId.HERE, tileType, surfaceTile)
        .then((copyrights) => {
          if (copyrights) {
            const newCopyrights = {
              ...copyrights,
            };

            newCopyrights[String(currentTilesOption)] = [
              ...(Object.values(copyrights).flat() as Copyright[]),
            ];

            this.copyrights = newCopyrights;
          }
        });
    }

    console.log("COPYRIGHTS: ", currentTilesOption);
    console.log("COPYRIGHTS: ", this.copyrights);
  };

  onAddControl = () => {
    this.unlApi = new UnlApi({
      apiKey: this.map.getApiKey(),
      vpmId: this.map.getVpmId(),
    });

    this.map.on("moveend", this.handleMoveEnd);
    this.map.on("styledata", this.updateCopyrights);

    this.map.addControl(this.attributionControl);
  };

  onRemoveControl = () => {
    this.map.off("moveend", this.handleMoveEnd);
    this.map.off("styledata", this.updateCopyrights);
    this.map.removeControl(this.attributionControl);
  };
}
