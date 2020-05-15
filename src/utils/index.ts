export const generateHash = (type: string = 'default', len: number = 6) => {
  let _type = type;
  let _len = len;
  // 定义随机字符集
  let _collection = '';
  let randomStr = '';

  switch (_type) {
    case 'default':
      _collection = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      break;
    case 'uppercase':
      _collection = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      break;
    case 'lowercase':
      _collection = 'abcdefghijklmnopqrstuvwxyz0123456789';
      break;
    default:
      break;
  }

  for (let i = 0; i < _len; i++) {
    randomStr += _collection.charAt(Math.floor(Math.random() * _collection.length));
  }

  return randomStr;
}