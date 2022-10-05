import { Copyright } from "../../api/tiles/models/Copyright";
import { SourceId } from "../../api/tiles/models/SourceId";
import UnlApi from "../../api/UnlApi";
import Base from "../Base/Base";
import { getCustomAttribution, getSurfaceTile, getTileType } from "./helpers";

export default class CustomAttributionControl extends Base {
  private unlApi?: UnlApi;
  private isFetchingCopyrigts: boolean;
  private copyrights: { [style: string]: Copyright[] };

  constructor() {
    super();
    this.copyrights = {};
    this.isFetchingCopyrigts = false;
  }

  handleMoveEnd = () => {
    this.map._controls.forEach((control) => {
      if (
        //@ts-ignore
        control.options &&
        //@ts-ignore
        ("customAttribution" in control.options || "_attribHTML" in control)
      ) {
        const mapBounds = this.map.getBounds();
        const zoom = this.map.getZoom();
        const newAttribution = getCustomAttribution(
          mapBounds,
          zoom,
          this.copyrights[String(this.map.getCurrentTilesOption())]
        );

        //@ts-ignore
        control.options.customAttribution = String(newAttribution);
        //@ts-ignore
        control._updateAttributions();
      }
    });
  };

  updateCopyrights = () => {
    if (this.isFetchingCopyrigts) {
      return;
    }

    const currentTilesOption = this.map.getCurrentTilesOption();
    if (!this.copyrights[currentTilesOption] && !this.isFetchingCopyrigts) {
      this.isFetchingCopyrigts = true;
      const tileType = getTileType(currentTilesOption);
      const surfaceTile = getSurfaceTile(currentTilesOption);

      this.unlApi?.tilesApi
        .getCopyrights(SourceId.HERE, tileType, surfaceTile)
        .then((response) => {
          if (response) {
            const newCopyrights = {
              ...this.copyrights,
            };

            newCopyrights[String(currentTilesOption)] = [
              ...(Object.values(response).flat() as Copyright[]),
            ];

            this.copyrights = newCopyrights;
            this.handleMoveEnd();
          }
        })
        .finally(() => {
          this.isFetchingCopyrigts = false;
        });
    }
  };

  onAddControl = () => {
    this.unlApi = new UnlApi({
      apiKey: this.map.getApiKey(),
      vpmId: this.map.getVpmId(),
    });

    this.map.on("moveend", this.handleMoveEnd);
    this.map.on("styledata", this.updateCopyrights);
  };

  onRemoveControl = () => {
    this.map.off("moveend", this.handleMoveEnd);
    this.map.off("styledata", this.updateCopyrights);
  };
}
