export const initialState = {
  appName: undefined,
  storageList: [],
  apparafileList: [],
  workList: [],
  originData: null, // 请求的原始数据
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'getOriginData': {
      return {
        ...state,
        originData: action.payload,
      };
    }
    case 'changeWorkList': {
      return {
        ...state,
        workList: action.payload,
      };
    }
    case 'changeAppName': {
      return {
        ...state,
        appName: action.payload,
      };
    }
    case 'changeStorageList': {
      return {
        ...state,
        storageList: action.payload,
      };
    }
    case 'changeApparafileList': {
      return {
        ...state,
        apparafileList: action.payload,
      };
    }
    default:
      return state;
  }
};
