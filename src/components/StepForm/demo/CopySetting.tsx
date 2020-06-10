import React, { useContext } from 'react';
import { Form, Input, Popover, InputNumber } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import FieldMessage from './fieldMessage';
import { FormRefContext } from '..';

export interface ICopySettingProps {
  dataWrapperName: string;
  originData: any;
}

const CopySetting: React.FC<ICopySettingProps> = ({
  dataWrapperName,
  originData,
}) => {
  const formRef: any = useContext(FormRefContext);
  const itemLabel = (label: string, tipMsg?: string) => {
    if (tipMsg) {
      return (
        <span>
          <span style={{ marginRight: 4 }}>{label}</span>
          <Popover
            content={tipMsg}
            getPopupContainer={(trigger) => {
              return trigger.parentNode?.parentNode?.parentNode?.parentNode
                ?.parentNode as HTMLElement;
            }}
          >
            <QuestionCircleOutlined />
          </Popover>
        </span>
      );
    }
    return label;
  };

  // 检查最大抖动数和最大不可用数 副本数
  const customValidator = (rule: any, value: string) => {
    const values = formRef.current?.getFieldsValue();
    if (value > values[dataWrapperName].replicas) {
      return Promise.reject(new Error('不能超过副本数'));
    }
    return Promise.resolve();
  };

  return (
    <>
      <Form.Item
        name={[`${dataWrapperName}`, 'containerName']}
        initialValue={originData ? originData['containerName'] : undefined}
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
        initialValue={originData ? originData['replicas'] : 1}
        validateFirst
        rules={[{ required: true, message: '副本数不能为空' }]}
        label={itemLabel('副本数', FieldMessage.replicas)}
      >
        <InputNumber
          min={0}
          max={2000}
          placeholder='请输入副本数'
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'historyLimit']}
        initialValue={originData ? originData['historyLimit'] : 1}
        validateFirst
        rules={[{ required: true, message: '历史版本数不能为空' }]}
        label={itemLabel('历史版本数', FieldMessage.historyLimit)}
      >
        <InputNumber
          min={1}
          max={10}
          placeholder='请输入历史版本保存数'
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'maxSurge']}
        initialValue={originData ? originData['maxSurge'] : 1}
        validateFirst
        rules={[
          { required: true, message: '最大抖动数不能为空' },
          { validator: customValidator },
        ]}
        label={itemLabel('最大抖动数', FieldMessage.maxSurge)}
      >
        <InputNumber
          min={0}
          max={9007199254740992}
          placeholder='请输入最大抖动数'
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'maxUnavailable']}
        initialValue={originData ? originData['maxUnavailable'] : 0}
        validateFirst
        rules={[
          { required: true, message: '最大不可用数不能为空' },
          { validator: customValidator },
        ]}
        label={itemLabel('最大不可用数', FieldMessage.maxUnavailable)}
      >
        <InputNumber
          min={0}
          max={9007199254740992}
          placeholder='请输入最大不可用数'
          style={{ width: '100%' }}
        />
      </Form.Item>
    </>
  );
};

export default CopySetting;
