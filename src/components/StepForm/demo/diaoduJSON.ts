import FieldMessage from './fieldMessage';
import { StepFormContentType } from '../StepFormContent';

export const diaoduJSON = [
  {
    key: 'workerName',
    type: 'select' as StepFormContentType,
    label: '节点名称',
    placeholder: '请选择节点名称',
    value: undefined,
    tipMsg: FieldMessage.applicationName,
    rules: [{ required: true, message: '请选择节点名称!' }],
    options: [],
  },
  {
    key: 'bindIp',
    type: 'input' as StepFormContentType,
    label: '绑定ip地址',
    placeholder: '请输入绑定ip地址',
    value: undefined,
    tipMsg: FieldMessage.image,
    rules: [{ required: true, message: '请输入绑定ip地址!' }],
  },
  {
    key: 'workerSelector',
    type: 'dynamicform' as StepFormContentType,
    label: '节点标签',
    tipMsg: FieldMessage.workerSelector,
  },
];

export const paramNames = ['nodeKey', 'nodeValue']; // api定义的键值对的字段名

export const diaoduFormItemTemplate = {
  [paramNames[0]]: {
    componentName: 'inputgroup',
    group: [
      {
        value: undefined,
        key: 'value',
        componentName: 'input',
        placeholder: '请输入标签名称',
        rules: [
          { required: true, message: '标签值不能为空' },
          { max: 255, message: '标签值长度最多255！' },
          {
            pattern: /^[a-zA-Z0-9-_]*$/,
            message: '节点标签内容由字母、数字、-、_组成',
          },
          // { validator: customeValidator },
        ],
      },
    ],
  },
  [paramNames[1]]: {
    componentName: 'inputgroup',
    group: [
      {
        value: undefined,
        key: 'value',
        componentName: 'input',
        placeholder: '请输入标签值',
        rules: [
          { required: true, message: '标签值不能为空' },
          { max: 255, message: '标签值长度最多255！' },
          {
            pattern: /^[a-zA-Z0-9-_]*$/,
            message: '节点标签内容由字母、数字、-、_组成',
          },
        ],
      },
    ],
  },
};
