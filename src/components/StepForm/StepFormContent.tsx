import React, { FC } from 'react';
import { Form, Input, Popover, InputNumber, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

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
  const itemContent = (item: IStepFormContentItem) => {
    if (item.type === ('input' as StepFormContentType)) {
      return <Input placeholder={item.placeholder} />;
    }
    if (item.type === ('inputnumber' as StepFormContentType)) {
      return (
        <InputNumber placeholder={item.placeholder} style={{ width: '100%' }} />
      );
    }
    if (item.type === ('select' as StepFormContentType)) {
      return (
        <Select placeholder={item.placeholder}>
          {item.options.map((op: any) => (
            <Option key={op.uid} value={op.workerName}>
              {op.showWorkerName}
            </Option>
          ))}
        </Select>
      );
    }
    return null;
  };
  const updateContent = (item: IStepFormContentItem) => {
    console.log('i am update');
    return (
      <Form.Item
        validateFirst
        key={`${dataWrapperName}-${item.key}`}
        name={[dataWrapperName, item.key]}
        rules={item.rules}
        initialValue={originData[item.key]}
        label={itemLabel(item.label, item.tipMsg)}
      >
        {itemContent(item)}
      </Form.Item>
    );
  };
  const createContent = (item: IStepFormContentItem) => {
    console.log('i am create');
    return (
      <Form.Item
        validateFirst
        key={`${dataWrapperName}-${item.key}`}
        name={[dataWrapperName, item.key]}
        rules={item.rules}
        label={itemLabel(item.label, item.tipMsg)}
      >
        {itemContent(item)}
      </Form.Item>
    );
  };
  return (
    <>
      {originData && infoItem.map((item) => updateContent(item))}
      {!originData && infoItem.map((item) => createContent(item))}
    </>
  );
};

export default StepFormContent;
