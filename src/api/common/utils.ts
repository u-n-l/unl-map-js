import urljoin from "url-join";
import Environment from "../../map/models/Environment";
import { HTTPS_STRING, SANDBOX_URL_PREFIX } from "./RestClient";

const prepareQueryParams = (params: any) => {
  let queryParameterString = "";
  let addSeperator = false;

  for (const key of Object.keys(params)) {
    queryParameterString +=
      (addSeperator ? "&" : "") +
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(params[key]);
    addSeperator = true;
  }

  return queryParameterString;
};

export const prepareUrl = (
  baseUrl: string,
  url: string,
  env: Environment,
  urlParameterMap?: any,
  queryStringParameters?: any
): URL => {
  let modifiedUrl = url;
  if (urlParameterMap) {
    for (const key of Object.keys(urlParameterMap)) {
      modifiedUrl = modifiedUrl.replace(
        new RegExp(`{${key}}`),
        urlParameterMap[key]
      );
    }
  }

  let envBaseUrl = baseUrl;

  if (env == Environment.SANDBOX) {
    const splitBaseUrl = baseUrl.split(HTTPS_STRING);
    envBaseUrl = SANDBOX_URL_PREFIX + splitBaseUrl[1];
  }

  modifiedUrl = urljoin(envBaseUrl, modifiedUrl);

  if (queryStringParameters) {
    const queryString = prepareQueryParams(queryStringParameters);
    if (queryString) {
      modifiedUrl = urljoin(modifiedUrl, `?${queryString}`);
    }
  }

  return new URL(modifiedUrl);
};
