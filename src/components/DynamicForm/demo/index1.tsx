import React, { useRef } from 'react';
import { Button } from 'antd';
import Form from 'antd/lib/form';
import DynamicForm, {
  IFormTemplate,
  IFormListItem,
  formSelectOption,
} from '..';

const DynamicFormDemo: React.FC = () => {
  // const formRef = React.createRef<FormInstance>(); // 当前 form 的引用
  const [form] = Form.useForm();
  const formRef = useRef(form);
  // 监控指标选项
  const nameOptions: formSelectOption[] = [
    { value: 'cpu', label: 'CPU' },
    { value: 'memory', label: 'MEMORY' },
  ];
  // 目标值单位
  const targetUnitOptions: formSelectOption[] = [{ value: '%', label: '%' }];
  // 持续时间单位
  const daretionUnitOptions: formSelectOption[] = [{ value: 's', label: 's' }];

  // 确定
  const handleOk = (values: any) => {
    console.log(values);
  };

  const keyName: string[] = ['name', 'target', 'daretion'];
  // 源数据，后端请求，格式如下
  const originData: IFormListItem[] = [
    {
      id: '1',
      [keyName[0]]: {
        componentName: 'select',
        value: 'cpu',
        placeholder: '请选择指标类型',
        options: nameOptions,
        rules: [{ required: true, message: '指标类型不能为空' }],
      },
      [keyName[1]]: {
        componentName: 'inputgroup',
        hasAddonAfter: true,
        group: [
          {
            value: '90',
            key: 'value',
            componentName: 'input',
            placeholder: '请输入目标值',
            rules: [
              { required: true, message: '目标值不能为空' },
              { max: 255, message: '目标值长度最多255！' },
            ],
          },
          {
            key: 'unit',
            componentName: 'select',
            value: targetUnitOptions[0].value,
            options: targetUnitOptions,
          },
        ],
      },
      [keyName[2]]: {
        componentName: 'inputgroup',
        hasAddonAfter: true,
        group: [
          {
            value: '233',
            key: 'value',
            componentName: 'input',
            placeholder: '请输入持续时间',
            rules: [
              { required: true, message: '持续时间不能为空' },
              { max: 255, message: '持续时间长度最多255！' },
            ],
          },
          {
            key: 'unit',
            componentName: 'select',
            placeholder: 'unit',
            value: daretionUnitOptions[0].value,
            options: daretionUnitOptions,
          },
        ],
      },
    },
  ];

  // 添加的每一项数据
  const formItemTemplate: IFormTemplate = {
    [keyName[0]]: {
      componentName: 'select',
      placeholder: '请选择指标类型',
      value: undefined,
      options: nameOptions,
      rules: [{ required: true, message: '指标类型不能为空' }],
    },
    [keyName[1]]: {
      componentName: 'inputgroup',
      hasAddonAfter: true,
      group: [
        {
          value: undefined,
          key: 'value',
          componentName: 'input',
          placeholder: '请输入目标值',
          rules: [
            { required: true, message: '目标值不能为空' },
            { max: 255, message: '目标值长度最多255！' },
          ],
        },
        {
          key: 'unit',
          componentName: 'select',
          value: targetUnitOptions[0].value,
          options: targetUnitOptions,
        },
      ],
    },
    [keyName[2]]: {
      componentName: 'inputgroup',
      hasAddonAfter: true,
      group: [
        {
          value: undefined,
          key: 'value',
          componentName: 'input',
          placeholder: '请输入持续时间',
          rules: [
            { required: true, message: '持续时间不能为空' },
            { max: 255, message: '持续时间长度最多255！' },
          ],
        },
        {
          value: daretionUnitOptions[0].value,
          key: 'unit',
          componentName: 'select',
          placeholder: 'unit',
          options: daretionUnitOptions,
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
