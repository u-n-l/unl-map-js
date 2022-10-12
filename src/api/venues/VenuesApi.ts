import { UnlApiConfig } from "../common/models/UnlApiConfig";
import { BaseAPI } from "../common/BaseApi";
import { ImdfFeatureType } from "./models/ImdfFeatureType";
import { DEFAULT_BASE_URL, ENDPOINTS_VERSION } from "../common/RestClient";
import ImdfFeature from "./models/ImdfFeature";

export default class VenuesApi extends BaseAPI {
  constructor(configuration: UnlApiConfig) {
    super(configuration);
  }

  public getImdfFeatures(
    projectId: string,
    venueId: string,
    levelOrdinal: number,
    includedFeatureTypes?: ImdfFeatureType[]
  ): Promise<ImdfFeature[]> {
    const pathParamMap = {
      project_id: projectId,
      venue_id: venueId,
    };
    const queryParams = { levelOrdinal, type: includedFeatureTypes?.join() };

    return this.restClient.get<ImdfFeature[]>(
      DEFAULT_BASE_URL,
      `${ENDPOINTS_VERSION}/projects/{project_id}/imdf/{venue_id}`,
      pathParamMap,
      queryParams
    );
  }
}
