import FieldMessage from './fieldMessage';
import { StepFormContentType } from '../StepFormContent';

export default [
  {
    key: 'applicationName',
    type: 'input' as StepFormContentType,
    label: '应用名',
    placeholder: 'Please input your applicationName',
    value: undefined,
    tipMsg: FieldMessage.applicationName,
    rules: [{ required: true, message: 'Please input your applicationName!' }],
  },
  {
    key: 'image',
    type: 'input' as StepFormContentType,
    label: '镜像名',
    placeholder: 'Please input your image',
    value: undefined,
    tipMsg: FieldMessage.image,
    rules: [{ required: true, message: 'Please input your image!' }],
  },
  {
    key: 'imageTag',
    type: 'input' as StepFormContentType,
    label: '镜像Tag',
    placeholder: 'Please input your imageTag',
    value: undefined,
    tipMsg: FieldMessage.imageTag,
    rules: [{ required: true, message: 'Please input your imageTag!' }],
  },
  {
    key: 'cpuResource',
    type: 'inputnumber' as StepFormContentType,
    label: 'CPU核数(毫核)',
    placeholder: 'Please input your cpuResource',
    value: undefined,
    tipMsg: FieldMessage.cpuResource,
    rules: [{ required: true, message: 'Please input your cpuResource!' }],
  },
  {
    key: 'memoryResource',
    type: 'inputnumber' as StepFormContentType,
    label: '内存容量(M)',
    placeholder: 'Please input your memoryResource',
    value: undefined,
    tipMsg: FieldMessage.memoryResource,
    rules: [{ required: true, message: 'Please input your memoryResource!' }],
  },
];
