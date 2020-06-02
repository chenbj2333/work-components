export type Method =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch'
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'
  | 'PATCH';

export interface AxiosRequestConfig {
  headers?: any;
  method?: Method;
  url: string;
  params?: any;
  data?: any;
  responseType?: XMLHttpRequestResponseType;
}

export interface AxiosResponse {
  headers: any;
  config: AxiosRequestConfig;
  request: any;
  status: number;
  statusText: string;
  data: any;
}

export interface AxiosPromise extends Promise<AxiosResponse> {}
