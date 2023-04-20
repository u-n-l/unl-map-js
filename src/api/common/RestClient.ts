import fetch from "isomorphic-fetch";
import { RequestMethod } from "./models/RequestMethod";
import { UnlApiConfig } from "./models/UnlApiConfig";
import { prepareUrl } from "./utils";

export const X_UNL_VPM_ID = "x-unl-vpm-id";
export const X_UNL_API_KEY = "x-unl-api-key";

export const ENDPOINTS_VERSION = "v1";
export const TILES_EDNPOINTS_VERSION = "v2alpha";

export const DEFAULT_BASE_URL = "https://api.unl.global/";
export const TILES_BASE_URL = "https://tiles.unl.global/";

export default class RestClient {
  public readonly apiKey: string;
  public readonly vpmId: string;

  constructor(unlApiConfig: UnlApiConfig) {
    this.apiKey = unlApiConfig.apiKey;
    this.vpmId = unlApiConfig.vpmId;
  }

  public get<T>(
    baseUrl: string,
    url: string,
    urlParameterMap?: object,
    queryStringParameters?: object,
    returnResponseWithoutParsing?: boolean,
    customHeader?: object
  ): Promise<T> {
    return this.request(
      RequestMethod.GET,
      baseUrl,
      url,
      urlParameterMap,
      queryStringParameters,
      undefined,
      returnResponseWithoutParsing,
      false,
      customHeader
    );
  }

  public post<T>(
    baseUrl: string,
    url: string,
    urlParameterMap?: object,
    body?: object,
    isMultipartFormData?: boolean
  ): Promise<T> {
    return this.request(
      RequestMethod.POST,
      baseUrl,
      url,
      urlParameterMap,
      {},
      body,
      undefined,
      isMultipartFormData
    );
  }

  public put<T>(
    baseUrl: string,
    url: string,
    urlParameterMap?: object,
    body?: object,
    isMultipartFormData?: boolean
  ): Promise<T> {
    return this.request(
      RequestMethod.PUT,
      baseUrl,
      url,
      urlParameterMap,
      {},
      body,
      undefined,
      isMultipartFormData
    );
  }

  public delete<T>(
    baseUrl: string,
    url: string,
    urlParameterMap?: object
  ): Promise<T> {
    return this.request(RequestMethod.DELETE, baseUrl, url, urlParameterMap);
  }

  private async getHeaders(isMultipartFormData?: boolean) {
    const headers: any = {};

    headers[X_UNL_API_KEY] = this.apiKey;
    headers[X_UNL_VPM_ID] = this.vpmId;

    if (!isMultipartFormData) {
      headers["Content-Type"] = "application/json";
    }

    headers["Accept"] = "application/json";

    return headers;
  }

  private async request<T>(
    method: string,
    baseUrl: string,
    url: string,
    urlParameterMap?: object,
    queryStringParameters?: object,
    body?: any,
    returnResponseWithoutParsing?: boolean,
    isMultipartFormData?: boolean,
    customHeader?: object
  ): Promise<any> {
    const requestUrl = prepareUrl(
      baseUrl,
      url,
      urlParameterMap,
      queryStringParameters
    );

    const headers = await this.getHeaders(isMultipartFormData);

    const request = {
      method: method,
      headers: customHeader
        ? { ...headers, ...customHeader }
        : {
            ...headers,
          },
      body: body ? (isMultipartFormData ? body : JSON.stringify(body)) : null,
    };

    return fetch(requestUrl.toString(), request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          response
            .json()
            .then((res) => {
              throw res;
            })
            .catch((ex) => {
              throw ex;
            });
        } else if (response.status === 204) {
          return null;
        } else if (response.status === 200 || response.status === 201) {
          if (returnResponseWithoutParsing) {
            return response;
          } else {
            return response.json();
          }
        } else {
          return null;
        }
      })
      .catch((ex) => {
        throw ex;
      });
  }
}
