import { UnlApiConfig } from "./common/models/UnlApiConfig";
import RecordsApi from "./records/RecordsApi";
import VenuesApi from "./venues/VenuesApi";

export default class UnlApi {
  constructor(configuration: UnlApiConfig) {
    this.recordsApi = new RecordsApi(configuration);
    this.venuesApi = new VenuesApi(configuration);
  }

  public readonly recordsApi: RecordsApi;
  public readonly venuesApi: VenuesApi;
}
