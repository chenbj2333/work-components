import React, { useEffect, useState, useContext } from 'react';
import { Select, Form, Input } from 'antd';
import { generateHash, deepClone } from '@/utils';
import DynamicForm, {
  IFormListItem,
  IFormTemplate,
} from '@/components/DynamicForm';
import { itemLabel, DataContext } from '.';
import { FormRefContext } from '..';
import FieldMessage from './fieldMessage';

const { Option } = Select;

export interface IDispatchSettingProps {
  dataWrapperName: string;
}

const DispatchSetting: React.FC<IDispatchSettingProps> = ({
  dataWrapperName,
}) => {
  const formRef: any = useContext(FormRefContext);
  const {
    commonFormData: { originData, workList },
  } = useContext(DataContext);
  const workerSelectorNames = ['nodeKey', 'nodeValue'];
  const workerSelector = 'workerSelector';
  const workerAffinityNames = ['key', 'operator', 'values'];
  const workerAffinity = 'workerAffinity';
  const [formItems, setFormItems] = useState<IFormListItem[]>([]);
  const [workerAffinityItems, setWorkerAffinityItems] = useState<
    IFormListItem[]
  >([]);

  // 检查是否有重复的key值
  const customeValidator = (rule: any, value: string) => {
    const values = formRef.current?.getFieldsValue();
    const content = values[dataWrapperName][workerSelector];
    let count = 0;
    if (content && content !== '' && content !== undefined) {
      Object.keys(content).forEach((key) => {
        if (content[key][workerSelectorNames[0]].value === value) {
          count += 1;
        }
      });
    }
    if (count > 1) {
      return Promise.reject(new Error('不能有重复的key值'));
    }
    return Promise.resolve();
  };
  const formItemTemplate: IFormTemplate = {
    [workerSelectorNames[0]]: {
      componentName: 'inputgroup',
      group: [
        {
          value: undefined,
          key: 'value',
          componentName: 'input',
          placeholder: '请输入标签名称',
          rules: [
            { required: true, message: '标签名称不能为空' },
            { max: 255, message: '标签名称长度最多255' },
            {
              pattern: /^[a-zA-Z0-9-_]*$/,
              message: '节点标签内容由字母、数字、-、_组成',
            },
            { validator: customeValidator },
          ],
        },
      ],
    },
    [workerSelectorNames[1]]: {
      componentName: 'inputgroup',
      group: [
        {
          value: undefined,
          key: 'value',
          componentName: 'input',
          placeholder: '请输入标签值',
          rules: [
            { required: true, message: '标签值不能为空' },
            { max: 255, message: '标签值长度最多255' },
            {
              pattern: /^[a-zA-Z0-9-_]*$/,
              message: '节点标签内容由字母、数字、-、_组成',
            },
          ],
        },
      ],
    },
  };

  const workerAffinityTemplate: IFormTemplate = {
    [workerAffinityNames[0]]: {
      componentName: 'inputgroup',
      group: [
        {
          value: undefined,
          key: 'value',
          componentName: 'input',
          placeholder: '请输入节点标签名称',
          rules: [
            { required: true, message: '节点标签名称不能为空' },
            { max: 255, message: '节点标签名称长度最多255' },
            {
              pattern: /^[a-zA-Z0-9-_]*$/,
              message: '节点标签内容由字母、数字、-、_组成',
            },
          ],
        },
      ],
    },
    [workerAffinityNames[1]]: {
      componentName: 'select',
      placeholder: '请选择匹配项',
      value: undefined,
      options: [
        { value: 'In', label: 'In' },
        { value: 'NotIn', label: 'NotIn' },
      ],
      rules: [{ required: true, message: '匹配项不能为空' }],
    },
    [workerAffinityNames[2]]: {
      componentName: 'inputgroup',
      group: [
        {
          value: undefined,
          key: 'value',
          componentName: 'input',
          placeholder: '多个值使用英文逗号隔开',
          rules: [
            { required: true, message: '值不能为空' },
            { max: 255, message: '值长度最多255' },
            {
              pattern: /^[a-zA-Z0-9-_,]*$/,
              message: '节点标签内容由字母、数字、-、_组成',
            },
          ],
        },
      ],
    },
  };

  const normalizeOriginData = (data: any) => {
    const itemList: IFormListItem[] = [];
    if (data) {
      Object.keys(data).forEach((key) => {
        const item = data[key];
        const template = deepClone(formItemTemplate);
        template[workerSelectorNames[0]].group[0].value = key;
        template[workerSelectorNames[1]].group[0].value = item;
        itemList.push({
          id: generateHash(),
          ...template,
        });
      });
    }
    setFormItems(itemList);
  };

  const normalizeWorkerAffinityData = (data: any) => {
    const itemList: IFormListItem[] = [];
    if (data) {
      Object.keys(data).forEach((key) => {
        const item = data[key];
        const template = deepClone(workerAffinityTemplate);
        template[workerAffinityNames[0]].group[0].value =
          item[workerAffinityNames[0]];
        template[workerAffinityNames[1]].value = item[workerAffinityNames[1]];
        template[workerAffinityNames[2]].group[0].value = item[
          workerAffinityNames[2]
        ].toString();
        itemList.push({
          id: generateHash(),
          ...template,
        });
      });
    }
    setWorkerAffinityItems(itemList);
  };

  useEffect(() => {
    if (originData) {
      normalizeOriginData(originData.workerSelector);
      normalizeWorkerAffinityData(originData.workerAffinity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Form.Item
        label={itemLabel('节点名称', FieldMessage.workerName)}
        name={[`${dataWrapperName}`, 'workerName']}
        initialValue={originData ? originData.workerName : undefined}
      >
        <Select
          placeholder='请选择节点名称'
          allowClear
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        >
          {workList.map((op: any) => (
            <Option key={op.uid} value={op.workerName}>
              {op.showWorkerName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label={itemLabel('绑定IP地址', FieldMessage.bindIp)}
        name={[`${dataWrapperName}`, 'bindIp']}
        rules={[
          {
            pattern: /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
            message: 'IP地址不符合IPv4规范',
          },
        ]}
        initialValue={originData ? originData.bindIp : undefined}
      >
        <Input placeholder='请输入绑定IP地址' allowClear />
      </Form.Item>
      <Form.Item label={itemLabel('节点标签', FieldMessage.workerSelector)}>
        <DynamicForm
          wrapperName={dataWrapperName}
          formListName={workerSelector}
          keyName={workerSelectorNames}
          formItemTemplate={formItemTemplate}
          originData={formItems}
          formRef={formRef}
          style={{ paddingTop: 1 }}
          isAutoCheck
        />
      </Form.Item>
      <Form.Item label={itemLabel('节点亲和性', FieldMessage.workerAffinity)}>
        <DynamicForm
          wrapperName={dataWrapperName}
          formListName={workerAffinity}
          keyName={workerAffinityNames}
          formItemTemplate={workerAffinityTemplate}
          originData={workerAffinityItems}
          formRef={formRef}
          style={{ paddingTop: 1 }}
          isAutoCheck
        />
      </Form.Item>
    </>
  );
};

export default DispatchSetting;
