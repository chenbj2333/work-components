import { isPlainObject } from '../utils';

export class DataTransform {
  public static transformRequst(data: any): any {
    if (isPlainObject(data)) {
      return JSON.stringify(data);
    }
    return data;
  }

  public static transformResponse(data: any): any {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        console.log(e);
      }
    }
    return data;
  }
}
