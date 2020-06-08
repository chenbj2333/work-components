import React, { FC } from 'react';
import { Form, Input, Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export interface IStepFormContentItem {
  key: string;
  type: string;
  label: string;
  placeholder: string;
  value: string | undefined;
  tipMsg: string;
  options?: any;
  rules: any;
}

export interface IStepFormContentProps {
  infoItem: IStepFormContentItem[];
}

const StepFormContent: FC<IStepFormContentProps> = ({ infoItem }) => {
  const itemLabel = (label: string, tipMsg?: string) => {
    if (tipMsg) {
      return (
        <div>
          <span style={{ marginRight: 4 }}>{label}</span>
          <Popover
            content={tipMsg}
            getPopupContainer={(triggerNode) =>
              triggerNode.parentNode?.parentNode?.parentNode as HTMLElement
            }
          >
            <QuestionCircleOutlined />
          </Popover>
        </div>
      );
    }
    return label;
  };
  return (
    <>
      {infoItem.map((item) => {
        if (item.type === 'input') {
          return (
            <Form.Item
              key={item.key}
              label={itemLabel(item.label, item.tipMsg)}
              name={item.key}
              rules={item.rules}
              initialValue={item.value}
            >
              <Input placeholder={item.placeholder} />
            </Form.Item>
          );
        }
        return null;
      })}
    </>
  );
};

export default StepFormContent;
