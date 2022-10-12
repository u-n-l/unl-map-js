import { UnlApiConfig } from "./common/models/UnlApiConfig";
import RecordsApi from "./records/RecordsApi";
import TilesApi from "./tiles/TilesApi";
import VenuesApi from "./venues/VenuesApi";

export default class UnlApi {
  public readonly recordsApi: RecordsApi;
  public readonly venuesApi: VenuesApi;
  public readonly tilesApi: TilesApi;

  constructor(configuration: UnlApiConfig) {
    this.recordsApi = new RecordsApi(configuration);
    this.venuesApi = new VenuesApi(configuration);
    this.tilesApi = new TilesApi(configuration);
  }
}
