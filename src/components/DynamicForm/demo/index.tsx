import React, { useRef } from 'react';
import { Button } from 'antd';
import Form from 'antd/lib/form';
import DynamicForm, { IFormTemplate, IFormListItem } from '..';

const DynamicFormDemo: React.FC = () => {
  // const formRef = React.createRef<FormInstance>(); // 当前 form 的引用
  const [form] = Form.useForm();
  const formRef = useRef(form);

  // 确定
  const handleOk = (values: any) => {
    console.log(values);
  };

  const keyName: string[] = ['resName', 'name', 'targetType', 'useValue'];
  // 源数据
  const originData: IFormListItem[] = [
    {
      id: '1',
      hasAddonAfter: true,
      [keyName[0]]: {
        componentName: 'input',
        disabled: true,
        value: 'resource',
      },
      [keyName[1]]: {
        componentName: 'select',
        value: 'cpu',
        options: [
          { value: 'cpu', label: 'CPU' },
          { value: 'memory', label: 'MEMORY' },
        ],
        rules: [{ required: true, message: 'name不能为空' }],
      },
      [keyName[2]]: {
        componentName: 'select',
        value: 'averagevalue',
        options: [
          { value: 'utilization', label: 'UTILIZATION', hasAddonAfter: false },
          { value: 'averagevalue', label: 'AVERAGEVALUE', hasAddonAfter: true },
        ],
        rules: [{ required: true, message: 'targetType不能为空' }],
      },
      [keyName[3]]: {
        componentName: 'inputgroup',
        group: [
          {
            value: '233',
            key: 'inputValue',
            componentName: 'input',
            placeholder: 'useValue',
            rules: [
              { required: true, message: 'useValue不能为空' },
              { max: 255, message: '标签值长度最多255！' },
            ],
          },
          {
            value: 'k',
            key: 'selectValue',
            componentName: 'select',
            placeholder: 'unit',
            rules: [{ required: true, message: 'unit不能为空' }],
            options: [
              { value: 'k', label: 'K' },
              { value: 'm', label: 'M' },
              { value: 'g', label: 'G' },
              { value: 't', label: 'T' },
            ],
          },
        ],
      },
    },
  ];

  // 添加的每一项数据
  const formItemTemplate: IFormTemplate = {
    hasAddonAfter: false,
    [keyName[0]]: {
      componentName: 'input',
      disabled: true,
      value: 'resource',
    },
    [keyName[1]]: {
      componentName: 'select',
      value: undefined,
      options: [
        { value: 'cpu', label: 'CPU' },
        { value: 'memory', label: 'MEMORY' },
      ],
      placeholder: '请选择名称',
      rules: [{ required: true, message: 'name不能为空' }],
    },
    [keyName[2]]: {
      componentName: 'select',
      placeholder: '请选择指标类型',
      value: undefined,
      options: [
        { value: 'utilization', label: 'UTILIZATION', hasAddonAfter: false },
        { value: 'averagevalue', label: 'AVERAGEVALUE', hasAddonAfter: true },
      ],
      rules: [{ required: true, message: 'targetType不能为空' }],
    },
    [keyName[3]]: {
      componentName: 'inputgroup',
      group: [
        {
          value: undefined,
          key: 'inputValue',
          componentName: 'input',
          placeholder: 'useValue',
          rules: [
            { required: true, message: 'useValue不能为空' },
            { max: 255, message: '标签值长度最多255！' },
          ],
        },
        {
          value: undefined,
          key: 'selectValue',
          componentName: 'select',
          rules: [{ required: true, message: '-' }],
          options: [
            { value: 'k', label: 'K' },
            { value: 'm', label: 'M' },
            { value: 'g', label: 'G' },
            { value: 't', label: 'T' },
          ],
        },
      ],
    },
  };

  return (
    <div>
      <Form onFinish={handleOk} ref={formRef}>
        <DynamicForm
          keyName={keyName}
          formItemTemplate={formItemTemplate}
          originData={originData}
          formRef={formRef}
          formListName='memo'
        />
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DynamicFormDemo;
