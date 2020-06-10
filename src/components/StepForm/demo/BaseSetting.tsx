import React, { useContext } from 'react';
import { Form, Input, Popover, InputNumber } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import FieldMessage from './fieldMessage';
import { FormRefContext } from '..';

export interface IBaseSettingProps {
  dataWrapperName: string;
  originData: any;
}

const BaseSetting: React.FC<IBaseSettingProps> = ({
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

  // 检查镜像和镜像tag的总长度
  const imageTagValidator = (rule: any, value: string) => {
    const values = formRef.current?.getFieldsValue();
    const imageLen = values[dataWrapperName].image?.length
      ? values[dataWrapperName].image?.length
      : 0;
    const imageTagLen = value?.length ? value.length : 0;
    if (imageLen + imageTagLen > 254) {
      return Promise.reject(new Error('镜像的完整名称长度不能超过254'));
    }
    return Promise.resolve();
  };

  return (
    <>
      <Form.Item
        name={[`${dataWrapperName}`, 'applicationName']}
        initialValue={originData ? originData['applicationName'] : undefined}
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
        <Input placeholder='请输入应用名' allowClear />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'image']}
        initialValue={originData ? originData['image'] : undefined}
        validateFirst
        rules={[
          { required: true, message: '镜像名不能为空' },
          { max: 245, message: '镜像名长度最多245' },
        ]}
        label={itemLabel('镜像名称', FieldMessage.image)}
      >
        <Input placeholder='请输入镜像名' allowClear />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'imageTag']}
        initialValue={originData ? originData['imageTag'] : undefined}
        validateFirst
        rules={[
          { required: true, message: '镜像Tag不能为空' },
          { max: 245, message: '镜像Tag长度最多245' },
          { validator: imageTagValidator },
        ]}
        label={itemLabel('镜像Tag', FieldMessage.imageTag)}
      >
        <Input placeholder='请输入镜像Tag' allowClear />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'cpuResource']}
        initialValue={originData ? originData['cpuResource'] : undefined}
        validateFirst
        rules={[{ required: true, message: 'CPU核数不能为空' }]}
        label={itemLabel('CPU核数(毫核)', FieldMessage.cpuResource)}
      >
        <InputNumber
          min={10}
          max={64000}
          placeholder='请输入CPU核数'
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'memoryResource']}
        initialValue={originData ? originData['memoryResource'] : undefined}
        validateFirst
        rules={[{ required: true, message: '内存容量不能为空' }]}
        label={itemLabel('内存容量(M)', FieldMessage.memoryResource)}
      >
        <InputNumber
          min={10}
          max={131071}
          placeholder='请输入内存容量'
          style={{ width: '100%' }}
        />
      </Form.Item>
    </>
  );
};

export default BaseSetting;
