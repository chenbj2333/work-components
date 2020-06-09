import FieldMessage from './fieldMessage';
import { StepFormContentType } from '../StepFormContent';

export default [
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
];
