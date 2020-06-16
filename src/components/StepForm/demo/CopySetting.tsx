import React, { useContext } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { itemLabel, DataContext } from '.';
import { FormRefContext } from '..';
import FieldMessage from './fieldMessage';

export interface ICopySettingProps {
  dataWrapperName: string;
}

const CopySetting: React.FC<ICopySettingProps> = ({ dataWrapperName }) => {
  const {
    commonFormData: { originData, appName },
  } = useContext(DataContext);
  const formRef: any = useContext(FormRefContext);
  if (!(originData && originData.containerName) && appName) {
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.setFieldsValue({
          [`${dataWrapperName}`]: { containerName: `${appName}-container` },
        });
      }
    });
  }

  return (
    <>
      <Form.Item
        name={[`${dataWrapperName}`, 'containerName']}
        initialValue={originData ? originData.containerName : undefined}
        validateFirst
        rules={[
          { required: true, message: '容器名称不能为空' },
          { max: 255, message: '容器名称长度最多255' },
          {
            pattern: /^[a-zA-Z][a-zA-Z0-9-]*$/,
            message: '容器名称只能以字母开头，内容为字母、中划线、数字',
          },
        ]}
        label={itemLabel('容器名称', FieldMessage.containerName)}
      >
        <Input placeholder='请输入容器名称' allowClear />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'replicas']}
        initialValue={originData ? originData.replicas : 1}
        validateFirst
        rules={[{ required: true, message: '副本数不能为空' }]}
        label={itemLabel('副本数', FieldMessage.replicas)}
      >
        <InputNumber
          min={0}
          max={2000}
          precision={0}
          placeholder='请输入副本数'
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'historyLimit']}
        initialValue={originData ? originData.historyLimit : 1}
        validateFirst
        rules={[{ required: true, message: '历史版本数不能为空' }]}
        label={itemLabel('历史版本数', FieldMessage.historyLimit)}
      >
        <InputNumber
          min={0}
          max={10}
          precision={0}
          placeholder='请输入历史版本保存数'
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'maxSurge']}
        initialValue={originData ? originData.maxSurge : 1}
        validateFirst
        rules={[{ required: true, message: '最大抖动数不能为空' }]}
        label={itemLabel('最大抖动数', FieldMessage.maxSurge)}
      >
        <InputNumber
          min={0}
          precision={0}
          placeholder='请输入最大抖动数'
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'maxUnavailable']}
        initialValue={originData ? originData.maxUnavailable : 0}
        validateFirst
        rules={[{ required: true, message: '最大不可用数不能为空' }]}
        label={itemLabel('最大不可用数', FieldMessage.maxUnavailable)}
      >
        <InputNumber
          min={0}
          precision={0}
          placeholder='请输入最大不可用数'
          style={{ width: '100%' }}
        />
      </Form.Item>
    </>
  );
};

export default CopySetting;
