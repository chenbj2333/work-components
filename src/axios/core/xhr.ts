import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
import { HeadersTransform } from './headers';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { url, data = null, method = 'get', headers, responseType } = config;
    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    request.open(method.toUpperCase(), url, true);

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return;
      }
      const responseHeaders = HeadersTransform.parseHeaders(
        request.getAllResponseHeaders()
      );
      const responseData =
        responseType !== 'text' ? request.response : request.responseText;
      const response: AxiosResponse = {
        headers: responseHeaders,
        status: request.status,
        statusText: request.statusText,
        data: responseData,
        config,
        request,
      };
      resolve(response);
    };

    headers &&
      Object.keys(headers).forEach((key) => {
        if (data === null && key.toLowerCase() === 'content-type') {
          delete headers[key];
        } else {
          request.setRequestHeader(key, headers[key]);
        }
      });

    request.send(data);
  });
}
