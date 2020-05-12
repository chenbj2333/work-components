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
  const keyName: string[] = ['name', 'target', 'daretion'];
  const formListName: string = 'memo';

  // 检查是否有重复的key值
  const customeValidator = (rule: any, value: string) => {
    const values = formRef.current?.getFieldsValue();
    let count = 0;
    if (values && value !== '' && value !== undefined) {
      Object.keys(values[formListName]).forEach((key) => {
        if (values[formListName][key][keyName[0]].value === value) {
          count += 1;
        }
      });
    }
    if (count > 1) {
      return Promise.reject(new Error('不能有重复的key值'));
    }
    return Promise.resolve();
  };

  // 确定
  const handleOk = (values: any) => {
    console.log(values);
  };

  const originData: IFormListItem[] = [];

  // 添加的每一项数据
  const formItemTemplate: IFormTemplate = {
    [keyName[0]]: {
      componentName: 'inputgroup',
      hasAddonAfter: false,
      group: [
        {
          value: undefined,
          key: 'value',
          componentName: 'input',
          placeholder: '请输入目标值',
          rules: [
            { required: true, message: '目标值不能为空' },
            { max: 255, message: '目标值长度最多255！' },
            {
              validator: (rule: any, value: string) =>
                customeValidator(rule, value),
            },
          ],
        },
      ],
    },
    [keyName[1]]: {
      componentName: 'select',
      placeholder: '请选择指标类型',
      value: undefined,
      options: nameOptions,
      rules: [{ required: true, message: '指标类型不能为空' }],
    },
    [keyName[2]]: {
      componentName: 'inputgroup',
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
          formListName={formListName}
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
