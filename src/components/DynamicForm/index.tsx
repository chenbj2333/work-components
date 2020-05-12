/*
 * @Description: 动态增减表单项组件
 * @Author: ChenBingJie
 * @Date: 2020-05-11 11:15:07
 * @Last Modified by: ChenBingJie
 * @Last Modified time: 2020-05-11 20:26:02
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Input, Select } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

export type formSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
  hasAddonAfter?: boolean; // 某个option是否有后缀
};

export interface IFormItem {
  componentName: 'input' | 'select'; // 组件名
  placeholder?: string; // 默认文字
  disabled?: boolean; // 是否禁用
  value: string; // 初始值
  key?: string; // key值，字段名
  rules?: any[]; // 验证规则
  hasAddonAfter?: boolean; // 是否有后缀
  options?: formSelectOption[]; // select选项
  onSelectChange?: (value: string, option: any, element: IFormItem) => void; // select值变化时调用的方法
}

export interface IFormTemplate {
  [name: string]: IFormItem | any;
}

export interface IFormListItem extends IFormTemplate {
  id: string | number;
}

export interface IDynamicFormProps {
  keyName: string[];
  formItemTemplate: IFormTemplate;
  originData: IFormListItem[];
  formRef: any;
  formListName?: string;
  isAutoCheck?: boolean;
  style?: any;
}

const { Option } = Select;

const DynamicForm: React.FC<IDynamicFormProps> = ({
  formItemTemplate,
  originData,
  keyName,
  formRef,
  formListName,
  isAutoCheck,
  style,
}) => {
  const colNum = keyName.length;
  const [formList, setFormList] = useState<IFormListItem[]>([]); // 组件内部维护的表单项列表

  // 初始化时，把已经存在的表单项值赋值给组件内部的表单项列表
  useEffect(() => {
    if (originData.length > 0) {
      setFormList([...originData]);
    }
  }, [originData]);

  useEffect(() => {
    if (isAutoCheck && formList.length > 0) {
      formRef.current.validateFields();
    }
  }, [formList]);

  const valueChange = () => {
    setFormList([...formList]);
  };

  // 添加新表单项
  const addTags = () => {
    setFormList([
      ...formList,
      {
        id:  new Date().getTime(),
        ...formItemTemplate,
      },
    ]);
  };

  // 删除表单项
  const deleteItem = (item: IFormListItem) => {
    const newArr = formList.filter((arrItem) => arrItem.id !== item.id);
    setFormList(newArr);
  };

  const input = (element: IFormItem) => (
    <Input
      allowClear
      placeholder={element.placeholder}
      disabled={element.disabled}
      onChange={valueChange}
    />
  );

  const select = (element: IFormItem) => (
    <Select
      placeholder={element.placeholder}
      onChange={(value: string, option: any) =>
        element.onSelectChange && element.onSelectChange(value, option, element)
      }
    >
      {element.options?.map((option: formSelectOption) => (
        <Option key={`${option.value}`} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );

  const content = (item: IFormListItem, name: string): React.ReactElement | null => {
    const element = item[name];
    const reactEle: { [name: string]: React.ReactElement } = {
      select: (
        <Form.Item
          name={
            formListName ? [`${formListName}`, `${item.id}`, `${name}`] : [`${item.id}`, `${name}`]
          }
          initialValue={element.value}
          rules={element.rules}
        >
          {select(element)}
        </Form.Item>
      ),
      inputgroup: (
        <Input.Group compact>
          {element.group &&
            element.group.map((g: IFormItem) => {
              if (g.componentName === 'input') {
                return (
                  <Form.Item
                    key={`${item.id}-${name}-${g.key}`}
                    name={
                      formListName
                        ? [`${formListName}`, `${item.id}`, `${name}`, `${g.key}`]
                        : [`${item.id}`, `${name}`, `${g.key}`]
                    }
                    initialValue={g.value}
                    rules={g.rules}
                    style={element.hasAddonAfter ? { width: '80%' } : { width: '100%' }}
                  >
                    {input(g)}
                  </Form.Item>
                );
              }
              if (g.componentName === 'select' && element.hasAddonAfter) {
                return (
                  <Form.Item
                    key={`${item.id}-${name}-${g.key}`}
                    name={
                      formListName
                        ? [`${formListName}`, `${item.id}`, `${name}`, `${g.key}`]
                        : [`${item.id}`, `${name}`, `${g.key}`]
                    }
                    initialValue={g.value}
                    rules={g.rules}
                    style={{ width: '20%' }}
                  >
                    {select(g)}
                  </Form.Item>
                );
              }
              return null;
            })}
        </Input.Group>
      ),
    };
    return reactEle[element.componentName] || null;
  };

  return (
    <div style={{ ...style, overflowX: 'hidden' }}>
      {formList.length > 0 &&
        formList.map((item: IFormListItem) => (
          <Row key={item.id} style={{ display: 'flex' }} gutter={16}>
            <Col span={22}>
              <Row gutter={16}>
                {keyName.map((name: string) => (
                  <Col key={name} span={24 / colNum}>
                    {content(item, name)}
                  </Col>
                ))}
              </Row>
            </Col>
            <Col key="minus-btn" span={2}>
              <Form.Item>
                <MinusCircleOutlined type="minus-circle" onClick={() => deleteItem(item)} />
              </Form.Item>
            </Col>
          </Row>
        ))}
      <Button type="link" onClick={addTags}>
        添加
      </Button>
    </div>
  );
};

export default DynamicForm;

// 切换select的值, 影响联动效果(例子)
// const handleSelectChange = (
//   value: string,
//   option: any,
//   item: IFormListItem
// ) => {
//   const flag = option.key.split('-')[1];
//   let newArr: IFormListItem[] = [];
//   formList.forEach((arrItem) => {
//     if (arrItem.id === item.id) {
//       arrItem.hasAddonAfter = flag === 'true';
//     }
//     newArr.push(arrItem);
//   });
//   setFormList(newArr);
// };
