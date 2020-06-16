/*
 * @Description: 动态增减表单项组件
 * @Author: ChenBingJie
 * @Date: 2020-05-11 11:15:07
 * @Last Modified by: ChenBingJie
 * @Last Modified time: 2020-06-10 14:34:59
 */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Select,
  InputNumber,
  Tooltip,
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import useDebounceFn from '@/hooks/useDebounceFn';
import { generateHash } from '@/utils';
// import ApparafileConfig from '@/config/apparafile';
import './index.less';

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
  validateFirst?: boolean; // 一组校验不通过是否停止剩下的校验(已经内置为true，整理代码时应删掉此属性)
  precision?: number; // 数字精度
  max?: number; // 数字最大值
  min?: number; // 数字最小值
  onSelectChange?: (value: string, option: any, element: IFormItem) => void; // select值变化时调用的方法
  row?: number; // textarea的行数
}

export interface IFormTemplate {
  hasUpload?: boolean; // 是否有上传按钮
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
  wrapperName?: string;
  isAutoCheck?: boolean;
  style?: any;
  addBtnName?: string; // 添加按钮的文字描述，默认为添加
  addBtnColSpan?: number; // 添加按钮的长度(栅格)
}

const { Option } = Select;
const { TextArea } = Input;

const DynamicForm: React.FC<IDynamicFormProps> = ({
  formItemTemplate,
  originData,
  keyName,
  formRef,
  wrapperName,
  formListName,
  isAutoCheck,
  addBtnName,
  addBtnColSpan,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formList]);

  const { run } = useDebounceFn(() => setFormList([...formList]), 500);
  const valueChange = () => {
    run();
  };

  const generateFormName = (
    id: string | number,
    name: string | number,
    key?: string | number
  ) => {
    if (key) {
      if (wrapperName && formListName) {
        return [
          `${wrapperName}`,
          `${formListName}`,
          `${id}`,
          `${name}`,
          `${key}`,
        ];
      }
      if (!wrapperName && formListName) {
        return [`${formListName}`, `${id}`, `${name}`, `${key}`];
      }
      return [`${id}`, `${name}`, `${key}`];
    } else {
      if (wrapperName && formListName) {
        return [`${wrapperName}`, `${formListName}`, `${id}`, `${name}`];
      }
      if (!wrapperName && formListName) {
        return [`${formListName}`, `${id}`, `${name}`];
      }
      return [`${id}`, `${name}`];
    }
  };

  // 添加新表单项
  const addTags = () => {
    setFormList([
      ...formList,
      {
        id: generateHash(),
        ...formItemTemplate,
      },
    ]);
  };

  // 删除表单项
  const deleteItem = (item: IFormListItem) => {
    const newArr = formList.filter((arrItem) => arrItem.id !== item.id);
    setFormList(newArr);
  };

  // 上传文件
  const uploadFile = (item: IFormListItem) => {
    item.uploadFile(item);
  };

  const input = (element: IFormItem) => (
    <Input
      allowClear
      placeholder={element.placeholder}
      disabled={element.disabled}
      onChange={valueChange}
    />
  );
  const inputNumber = (element: IFormItem) => (
    <InputNumber
      placeholder={element.placeholder}
      disabled={element.disabled}
      precision={element.precision}
      max={element.max}
      min={element.min}
      onChange={valueChange}
      style={{ width: '100%' }}
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

  const textArea = (item: IFormListItem, name: string, element: IFormItem) => {
    return (
      <Form.Item
        key={`${item.id}-${name}-${element.key}`}
        name={generateFormName(item.id, name)}
        initialValue={element.value}
        rules={element.rules}
      >
        <TextArea
          rows={element.row}
          placeholder={element.placeholder}
          onChange={valueChange}
          allowClear
        />
      </Form.Item>
    );
  };

  const content = (
    item: IFormListItem,
    name: string
  ): React.ReactElement | null => {
    const element = item[name];
    const reactEle: { [name: string]: React.ReactElement } = {
      select: (
        <Form.Item
          name={generateFormName(item.id, name)}
          initialValue={element.value}
          rules={element.rules}
          validateFirst
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
                    name={generateFormName(item.id, name, g.key)}
                    initialValue={g.value}
                    rules={g.rules}
                    validateFirst
                    style={
                      element.hasAddonAfter
                        ? { width: '80%' }
                        : { width: '100%' }
                    }
                  >
                    {input(g)}
                  </Form.Item>
                );
              }
              if (g.componentName === 'select' && element.hasAddonAfter) {
                return (
                  <Form.Item
                    key={`${item.id}-${name}-${g.key}`}
                    name={generateFormName(item.id, name, g.key)}
                    initialValue={g.value}
                    rules={g.rules}
                    validateFirst
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
      inputNumber: (
        <Form.Item
          key={`${item.id}-${name}-${element.key}`}
          name={generateFormName(item.id, name)}
          initialValue={element.value}
          rules={element.rules}
        >
          {inputNumber(element)}
        </Form.Item>
      ),
      textArea: textArea(item, name, element),
    };
    return reactEle[element.componentName] || null;
  };

  return (
    <div style={{ ...style, overflowX: 'hidden', paddingTop: 1 }}>
      {formList.length > 0 &&
        formList.map((item: IFormListItem) => {
          return item.hasUpload ? (
            <Row
              id='dynamic-form-id'
              key={item.id}
              style={{ display: 'flex', position: 'relative' }}
              gutter={16}
            >
              <Col span={24}>
                <Row>
                  {keyName.map((name: string) => (
                    <Col
                      key={name}
                      span={item[name].componentName === 'textArea' ? 24 : 20}
                      style={{ position: 'relative' }}
                    >
                      {content(item, name)}
                    </Col>
                  ))}
                </Row>
              </Col>
              <div style={{ position: 'absolute', right: 0, width: 64 }}>
                <Row>
                  <Col
                    span={12}
                    onChange={() => uploadFile(item)}
                    style={{ position: 'relative' }}
                  >
                    <Form.Item style={{ textAlign: 'center' }}>
                      <Tooltip
                        placement='topRight'
                        title='上传文件'
                        getPopupContainer={() =>
                          document.getElementById('dynamic-form-id')
                            ?.parentNode as HTMLElement
                        }
                      >
                        <input
                          type='file'
                          id={`upload-file-${item.id}`}
                          accept={item.uploadFileType}
                          title=''
                          className='dynamic-form-upload'
                        />
                      </Tooltip>
                      <UploadOutlined />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item style={{ textAlign: 'center' }}>
                      <MinusCircleOutlined onClick={() => deleteItem(item)} />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Row>
          ) : (
            <Row key={item.id} style={{ display: 'flex' }} gutter={8}>
              <Col span={22}>
                <Row gutter={8}>
                  {keyName.map((name: string) => (
                    <Col key={name} span={24 / colNum}>
                      {content(item, name)}
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col key='minus-btn' span={2}>
                {!item.isRequired ? (
                  <Form.Item>
                    <MinusCircleOutlined onClick={() => deleteItem(item)} />
                  </Form.Item>
                ) : null}
              </Col>
            </Row>
          );
        })}
      <Row>
        <Col span={addBtnColSpan || 24}>
          <Button type='dashed' onClick={addTags} style={{ width: '100%' }}>
            <PlusOutlined /> {addBtnName || '添加'}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DynamicForm;
