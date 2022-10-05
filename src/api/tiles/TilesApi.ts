import { UnlApiConfig } from "../common/models/UnlApiConfig";
import { TILES_BASE_URL, TILES_EDNPOINTS_VERSION } from "../common/RestClient";
import { BaseAPI } from "../common/BaseApi";
import { SourceId } from "./models/SourceId";
import { TileType } from "./models/TileType";
import { SurfaceTile } from "./models/SurfaceTile";
import { Copyright } from "./models/Copyright";

export default class TilesApi extends BaseAPI {
  constructor(configuration: UnlApiConfig) {
    super(configuration);
  }

  public getCopyrights(
    sourceId: SourceId,
    tileType: TileType,
    surfaceTile?: SurfaceTile
  ): Promise<{ [id: string]: Copyright[] }> {
    const pathParamMap = {
      source_id: sourceId,
      tile_type: tileType,
    };
    const queryParams = { surfaceTile };

    return this.restClient.get<{ [id: string]: Copyright[] }>(
      TILES_BASE_URL,
      `${TILES_EDNPOINTS_VERSION}/copyright/{source_id}/tileType/{tile_type}`,
      pathParamMap,
      surfaceTile ? queryParams : undefined
    );
  }
}
