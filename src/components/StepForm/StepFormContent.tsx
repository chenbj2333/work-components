import React, { FC } from 'react';
import { Form, Input, Popover, InputNumber } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export type StepFormContentType = 'input' | 'inputnumber' | 'select';

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
  dataWrapperName: string; // 当前表单名称
  originData: any; // 后端获取的数据
}

const StepFormContent: FC<IStepFormContentProps> = ({
  infoItem,
  dataWrapperName,
  originData,
}) => {
  console.log(originData);
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
  const content = (item: IStepFormContentItem) => {
    if (item.type === ('input' as StepFormContentType)) {
      return (
        <Form.Item
          key={`${dataWrapperName}-${item.key}`}
          name={[dataWrapperName, item.key]}
          rules={item.rules}
          // initialValue={originData[item.key]}
          label={itemLabel(item.label, item.tipMsg)}
          style={{ overflow: 'auto' }}
        >
          <Input placeholder={item.placeholder} />
        </Form.Item>
      );
    }
    if (item.type === ('inputnumber' as StepFormContentType)) {
      return (
        <Form.Item
          key={`${dataWrapperName}-${item.key}`}
          name={[dataWrapperName, item.key]}
          rules={item.rules}
          initialValue={item.value}
          label={itemLabel(item.label, item.tipMsg)}
          style={{ overflow: 'auto' }}
        >
          <InputNumber
            placeholder={item.placeholder}
            style={{ width: '100%' }}
          />
        </Form.Item>
      );
    }
    return null;
  };
  return <>{infoItem.map((item) => content(item))}</>;
};

export default StepFormContent;
