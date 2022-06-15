import { UnlApiConfig } from "./models/UnlApiConfig";
import RestClient from "./RestClient";

export class BaseAPI {
  protected restClient: RestClient;

  constructor(unlApiConfig: UnlApiConfig) {
    this.restClient = new RestClient(unlApiConfig);
  }
}
