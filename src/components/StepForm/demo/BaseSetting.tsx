/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import useDebounceFn from '@/hooks/useDebounceFn';
import {
  RESTARTPOLICY,
  ConcurrenccyPolicyItem,
  IMAGEPULLRTPOLICY,
} from './config';
import { itemLabel, DataContext } from '.';
import { FormRefContext } from '..';
import FieldMessage from './fieldMessage';

export interface IBaseSettingProps {
  dataWrapperName: string;
  applicationNameEmitter?: any;
}

const BaseSetting: React.FC<IBaseSettingProps> = ({
  dataWrapperName,
  applicationNameEmitter,
}) => {
  const formRef: any = useContext(FormRefContext);
  const {
    commonFormData: { originData },
    dispatch,
  } = useContext(DataContext);
  const [appName, setAppName] = useState(undefined);

  const { run } = useDebounceFn(
    () => {
      dispatch({
        type: 'changeAppName',
        payload: appName,
      });
      applicationNameEmitter.emit('changeAppName');
    },
    [appName],
    500
  );

  const handleChange = (e: any) => {
    setAppName(e.target.value);
    run();
  };

  // 返回select options 组件
  const getOptions = (data: Array<ConcurrenccyPolicyItem> = []) => {
    return data.map((item) => (
      <Select.Option key={item.value} value={item.value}>
        {item.lable}
      </Select.Option>
    ));
  };

  return (
    <>
      <Form.Item
        name={[`${dataWrapperName}`, 'applicationName']}
        initialValue={originData ? originData.applicationName : undefined}
        validateFirst
        rules={[
          { required: true, message: '应用名不能为空' },
          { max: 245, message: '应用名长度最多245' },
          {
            pattern: /^[a-zA-Z][a-zA-Z0-9-]*$/,
            message: '应用名只能以字母开头，内容为字母、中划线、数字',
          },
        ]}
        label={itemLabel('应用名', FieldMessage.applicationName)}
      >
        <Input
          disabled={originData && originData.applicationName}
          value={appName}
          placeholder='请输入应用名'
          onChange={handleChange}
          allowClear
        />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'imagePullPolicy']}
        initialValue={originData ? originData.imagePullPolicy : undefined}
        validateFirst
        rules={[{ required: true, message: '请选择镜像拉取策略' }]}
        label='镜像拉取策略'
      >
        <Select
          placeholder='请选择镜像拉取策略'
          allowClear
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        >
          {getOptions(IMAGEPULLRTPOLICY)}
        </Select>
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'cpuResource']}
        initialValue={originData ? originData.cpuResource : undefined}
        validateFirst
        rules={[{ required: true, message: 'CPU核数不能为空' }]}
        label={itemLabel('CPU核数(毫核)', FieldMessage.cpuResource)}
      >
        <InputNumber
          min={10}
          max={64000}
          precision={0}
          placeholder='请输入CPU核数'
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'memoryResource']}
        initialValue={originData ? originData.memoryResource : undefined}
        validateFirst
        rules={[{ required: true, message: '内存容量不能为空' }]}
        label={itemLabel('内存容量(M)', FieldMessage.memoryResource)}
      >
        <InputNumber
          min={10}
          max={131071}
          precision={0}
          placeholder='请输入内存容量'
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'restartPolicy']}
        initialValue={originData ? originData.restartPolicy : 'Always'}
        validateFirst
        rules={[{ required: true, message: '请选择重启策略' }]}
        label='重启策略'
      >
        <Select
          placeholder='请选择重启策略'
          allowClear
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        >
          {getOptions(RESTARTPOLICY)}
        </Select>
      </Form.Item>
    </>
  );
};

export default BaseSetting;
