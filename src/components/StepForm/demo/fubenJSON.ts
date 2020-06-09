import FieldMessage from './fieldMessage';
import { StepFormContentType } from '../StepFormContent';

export default [
  {
    key: 'containerName',
    type: 'input' as StepFormContentType,
    label: '容器名称',
    placeholder: 'Please input your containerName',
    value: undefined,
    tipMsg: FieldMessage.applicationName,
    rules: [{ required: true, message: 'Please input your containerName!' }],
  },
  {
    key: 'replicas',
    type: 'inputnumber' as StepFormContentType,
    label: '副本数',
    placeholder: 'Please input your 副本数',
    value: undefined,
    tipMsg: FieldMessage.image,
    rules: [{ required: true, message: 'Please input your 副本数!' }],
  },
  {
    key: 'historyLimit',
    type: 'inputnumber' as StepFormContentType,
    label: '历史版本数',
    placeholder: 'Please input your 历史版本数',
    value: undefined,
    tipMsg: FieldMessage.historyLimit,
    rules: [{ required: true, message: 'Please input your 历史版本数!' }],
  },
  {
    key: 'maxSurge',
    type: 'inputnumber' as StepFormContentType,
    label: '最大抖动数',
    placeholder: 'Please input your 最大抖动数',
    value: undefined,
    tipMsg: FieldMessage.cpuResource,
    rules: [{ required: true, message: 'Please input your 最大抖动数!' }],
  },
  {
    key: 'maxUnavailable',
    type: 'inputnumber' as StepFormContentType,
    label: '最大不可用数',
    placeholder: 'Please input your 最大不可用数',
    value: undefined,
    tipMsg: FieldMessage.maxUnavailable,
    rules: [{ required: true, message: 'Please input your 最大不可用数!' }],
  },
];
