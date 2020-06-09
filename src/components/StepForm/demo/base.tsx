import React from 'react';
import { Form, Input, Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import FieldMessage from './fieldMessage';

const CreateAppBase: React.FC = () => {
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
        key='applicationName'
        name='applicationName'
        // initialValue={item.value}
        rules={[
          { required: true, message: 'Please input your applicationName!' },
        ]}
        label={itemLabel('应用名', FieldMessage.applicationName)}
      >
        <Input placeholder='请输入应用名' />
      </Form.Item>
    </>
  );
};

export default CreateAppBase;
