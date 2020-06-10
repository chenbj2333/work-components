import React from 'react';
import { Form, Input, Popover, InputNumber } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import FieldMessage from './fieldMessage';

export interface IBaseSettingProps {
  dataWrapperName: string;
  originData: any;
}

const BaseSetting: React.FC<IBaseSettingProps> = ({
  dataWrapperName,
  originData,
}) => {
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

  return (
    <>
      <Form.Item
        name={[`${dataWrapperName}`, 'applicationName']}
        initialValue={originData ? originData['applicationName'] : undefined}
        rules={[{ required: true, message: '应用名不能为空' }]}
        label={itemLabel('应用名', FieldMessage.applicationName)}
      >
        <Input placeholder='请输入应用名' allowClear />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'image']}
        initialValue={originData ? originData['image'] : undefined}
        rules={[{ required: true, message: '镜像名不能为空' }]}
        label={itemLabel('镜像名称', FieldMessage.image)}
      >
        <Input placeholder='请输入镜像名' allowClear />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'imageTag']}
        initialValue={originData ? originData['imageTag'] : undefined}
        rules={[{ required: true, message: '镜像Tag不能为空' }]}
        label={itemLabel('镜像Tag', FieldMessage.imageTag)}
      >
        <Input placeholder='请输入镜像Tag' allowClear />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'cpuResource']}
        initialValue={originData ? originData['cpuResource'] : undefined}
        rules={[{ required: true, message: 'CPU核数不能为空' }]}
        label={itemLabel('CPU核数(毫核)', FieldMessage.cpuResource)}
      >
        <InputNumber placeholder='请输入CPU核数' style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name={[`${dataWrapperName}`, 'memoryResource']}
        initialValue={originData ? originData['memoryResource'] : undefined}
        rules={[{ required: true, message: '内存容量不能为空' }]}
        label={itemLabel('内存容量(M)', FieldMessage.memoryResource)}
      >
        <InputNumber placeholder='请输入内存容量' style={{ width: '100%' }} />
      </Form.Item>
    </>
  );
};

export default BaseSetting;
