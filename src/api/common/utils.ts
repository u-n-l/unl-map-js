import urljoin from "url-join";

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

  modifiedUrl = urljoin(baseUrl, modifiedUrl);

  if (queryStringParameters) {
    const queryString = prepareQueryParams(queryStringParameters);
    if (queryString) {
      modifiedUrl = urljoin(modifiedUrl, `?${queryString}`);
    }
  }

  return new URL(modifiedUrl);
};
