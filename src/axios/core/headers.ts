import { isPlainObject } from '../utils';

function normalizeHeadersName(headers: any, normalizedName: string): void {
  if (!headers) {
    return;
  }
  Object.keys(headers).forEach((key) => {
    if (
      key !== normalizedName &&
      key.toLowerCase() === normalizedName.toLowerCase()
    ) {
      headers[normalizedName] = headers[key];
      delete headers[key];
    }
  });
}

export class HeadersTransform {
  public static processHeaders(headers: any, data?: any): any {
    normalizeHeadersName(headers, 'Cotent-Type');
    if (isPlainObject(data)) {
      if (headers && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json;charsetutf-8';
      }
    }
    return headers;
  }
  public static parseHeaders(headers: string): any {
    let parsed = Object.create(null);
    if (!headers) {
      return parsed;
    }

    headers.split('\r\n').forEach((line) => {
      let [key, val] = line.split(':');
      key = key.trim().toLowerCase();
      if (!key) {
        return;
      }
      if (val) {
        val = val.trim();
      }
      parsed[key] = val;
    });
    return parsed;
  }
}
