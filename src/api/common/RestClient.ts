import fetch from "isomorphic-fetch";
import { RequestMethod } from "./models/RequestMethod";
import { UnlApiConfig } from "./models/UnlApiConfig";
import { prepareUrl } from "./utils";

export const X_UNL_VPM_ID = "x-unl-vpm-id";
export const X_UNL_API_KEY = "x-unl-api-key";

const BASE_URL = "https://sandbox.unl.global/api/v1/";

export default class RestClient {
  public readonly apiKey: string;

  constructor(unlApiConfig: UnlApiConfig) {
    this.apiKey = unlApiConfig.apiKey;
  }

  public get<T>(
    url: string,
    urlParameterMap?: object,
    queryStringParameters?: object,
    returnResponseWithoutParsing?: boolean,
    customHeader?: object
  ): Promise<T> {
    return this.request(
      RequestMethod.GET,
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
    url: string,
    urlParameterMap?: object,
    body?: object,
    isMultipartFormData?: boolean
  ): Promise<T> {
    return this.request(
      RequestMethod.POST,
      url,
      urlParameterMap,
      {},
      body,
      undefined,
      isMultipartFormData
    );
  }

  public put<T>(
    url: string,
    urlParameterMap?: object,
    body?: object,
    isMultipartFormData?: boolean
  ): Promise<T> {
    return this.request(
      RequestMethod.PUT,
      url,
      urlParameterMap,
      {},
      body,
      undefined,
      isMultipartFormData
    );
  }

  public delete<T>(url: string, urlParameterMap?: object): Promise<T> {
    return this.request(RequestMethod.DELETE, url, urlParameterMap);
  }

  private async getHeaders(isMultipartFormData?: boolean) {
    const headers: any = {};

    headers[X_UNL_API_KEY] = this.apiKey;

    if (!isMultipartFormData) {
      headers["Content-Type"] = "application/json";
    }

    headers["Accept"] = "application/json";

    return headers;
  }

  private async request<T>(
    method: string,
    url: string,
    urlParameterMap?: object,
    queryStringParameters?: object,
    body?: any,
    returnResponseWithoutParsing?: boolean,
    isMultipartFormData?: boolean,
    customHeader?: object
  ): Promise<any> {
    const requestUrl = prepareUrl(
      BASE_URL,
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
