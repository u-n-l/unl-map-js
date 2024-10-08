import { UnlApiConfig } from "../common/models/UnlApiConfig";
import { PaginationResponse } from "../common/models/PaginationResponse";
import { PaginationParams } from "../common/models/PaginationParams";
import { BaseAPI } from "../common/BaseApi";
import { DEFAULT_BASE_URL, ENDPOINTS_VERSION } from "../common/RestClient";
import { Record } from "./models/Record";

export default class RecordsApi extends BaseAPI {
  constructor(configuration: UnlApiConfig) {
    super(configuration);
  }

  public create(projectId: string, feature: GeoJSON.Feature): Promise<Record> {
    const pathParamMap = {
      project_id: projectId,
    };

    return this.restClient.post<Record>(
      DEFAULT_BASE_URL,
      `${ENDPOINTS_VERSION}projects/{project_id}/records`,
      pathParamMap,
      {
        geojson: feature,
      }
    );
  }

  public getAll(
    projectId: string,
    filterBy: string,
    paginationParams?: PaginationParams
  ): Promise<PaginationResponse<Record>> {
    const pathParamMap = {
      project_id: projectId,
    };

    const queryStringParameters = {
      filter_by: filterBy,
      ...paginationParams,
    };

    return this.restClient.get<PaginationResponse<Record>>(
      DEFAULT_BASE_URL,
      `${ENDPOINTS_VERSION}/projects/{project_id}/records`,
      pathParamMap,
      queryStringParameters
    );
  }

  public update(
    projectId: string,
    recordId: string,
    feature: GeoJSON.Feature
  ): Promise<Record> {
    const pathParamMap = {
      project_id: projectId,
      record_id: recordId,
    };

    return this.restClient.put<Record>(
      DEFAULT_BASE_URL,
      `${ENDPOINTS_VERSION}/projects/{project_id}/records/{record_id}`,
      pathParamMap,
      {
        geojson: feature,
      }
    );
  }

  public delete(projectId: string, recordId: string): Promise<Record> {
    const pathParamMap = {
      project_id: projectId,
      record_id: recordId,
    };

    return this.restClient.delete<Record>(
      DEFAULT_BASE_URL,
      `${ENDPOINTS_VERSION}/projects/{project_id}/records/{record_id}`,
      pathParamMap
    );
  }
}
