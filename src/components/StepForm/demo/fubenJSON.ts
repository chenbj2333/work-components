import FieldMessage from './fieldMessage';
export default [
  {
    key: 'fuben1',
    type: 'input',
    label: '应用名',
    placeholder: 'Please input your applicationName',
    value: undefined,
    tipMsg: FieldMessage.applicationName,
    rules: [{ required: true, message: 'Please input your applicationName!' }],
  },
  {
    key: 'fuben2',
    type: 'input',
    label: '镜像名',
    placeholder: 'Please input your image',
    value: undefined,
    tipMsg: FieldMessage.image,
    rules: [{ required: true, message: 'Please input your image!' }],
  },
];
