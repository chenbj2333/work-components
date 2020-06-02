import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types';
import xhr from './core/xhr';
import { DataTransform } from './core/data';
import { URLTransform } from './core/utl';
import { HeadersTransform } from './core/headers';

// 处理headers
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return HeadersTransform.processHeaders(headers, data);
}

// 处理url
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return URLTransform.buildURL(url, params);
}

// 处理请求时的data
function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config;
  return DataTransform.transformRequst(data);
}

// 处理返回的data
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = DataTransform.transformResponse(res.data);
  return res;
}

// 处理请求(request)
function processConfig(config: AxiosRequestConfig): void {
  config.headers = transformHeaders(config);
  config.url = transformUrl(config);
  config.data = transformRequestData(config);
}

export default function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then((res) => {
    return transformResponseData(res);
  });
}
