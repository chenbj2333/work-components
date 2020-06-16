/*
 * @Description: 分步表单组件
 * @Author: ChenBingJie
 * @Date: 2020-06-11 10:06:04
 * @Last Modified by: ChenBingJie
 * @Last Modified time: 2020-06-15 19:37:30
 */

import React, { FC, useState, useRef, ReactNode, createContext } from 'react';
import { Steps, Button, Form } from 'antd';
import './index.less';

const { Step } = Steps;

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

export type TStepStatusType =
  | 'error'
  | 'wait'
  | 'process'
  | 'finish'
  | undefined;

export interface stepInfoItem {
  key: number | number;
  name: string;
  status: TStepStatusType;
  description?: string;
  dataWrapperName?: string;
  component: ReactNode;
}

export interface IStepFormProps {
  originStepInfoList: stepInfoItem[];
  onCloseFun: () => void;
  submitFun: (values: any) => void;
  btnLoading?: boolean;
  style?: any;
  btnText?: string;
}

export const FormRefContext: any = createContext(null);

const StepForm: FC<IStepFormProps> = ({
  originStepInfoList,
  onCloseFun,
  submitFun,
  btnLoading,
  style,
  btnText,
}) => {
  const [form] = Form.useForm();
  const formRef = useRef(form);
  const [current, setCurrent] = useState(originStepInfoList[0]?.key);
  const [stepInfoList, setStepInfoList] = useState(originStepInfoList);

  // 设置状态
  const setStatus = (cur: number) => {
    stepInfoList.forEach((item: stepInfoItem) => {
      if (item.status !== 'error') {
        Reflect.set(item, 'status', 'wait');
      }
      if (item.key === cur) {
        Reflect.set(item, 'status', 'process');
      }
    });
    setStepInfoList([...stepInfoList]);
  };

  // 提交
  const submitClick = () => {
    setStatus(current);
    formRef.current.submit();
  };

  // 表单成功的回调
  const onFinish = (values: any) => {
    submitFun(values);
  };

  // 表单失败的回调
  const onFinishFailed = (props: {
    values: any;
    errorFields: any;
    outOfDate: boolean;
  }) => {
    const { errorFields } = props;
    const errItem: string[] = [];
    errorFields.forEach((err: any) => {
      if (err.errors.length > 0) {
        errItem.push(err.name[0]);
      }
    });
    // @ts-ignore
    const errNames = [...new Set(errItem)];
    errNames.forEach((name) => {
      stepInfoList.forEach((info) => {
        if (name === info.dataWrapperName) {
          Reflect.set(info, 'status', 'error');
        }
      });
    });
    setStepInfoList([...stepInfoList]);
  };

  // 步骤条变化
  const handleChange = (cur: number) => {
    setStatus(cur);
    setCurrent(cur);
  };

  return (
    <div className='stepform-wrapper' style={style}>
      <section className='stepform-content'>
        <section className='stepform-left'>
          <Steps current={current} onChange={handleChange} direction='vertical'>
            {stepInfoList.map((stepInfo) => (
              <Step
                key={stepInfo.key}
                title={stepInfo.name}
                description={stepInfo.description}
                status={stepInfo.status}
                style={{ minHeight: 80 }}
              />
            ))}
          </Steps>
        </section>
        <div className='stepform-divider' />
        <section className='stepform-right'>
          <Form
            ref={formRef}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            {...layout}
          >
            <FormRefContext.Provider value={formRef}>
              {stepInfoList.map((stepInfo) => (
                <div
                  key={stepInfo.key}
                  style={
                    current === stepInfo.key
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                >
                  {stepInfo.component}
                </div>
              ))}
            </FormRefContext.Provider>
          </Form>
        </section>
      </section>
      <footer className='stepform-footer'>
        <Button className='stepform-footer-btn' onClick={onCloseFun}>
          取消
        </Button>
        <Button
          loading={btnLoading}
          type='primary'
          className='stepform-footer-btn'
          onClick={submitClick}
        >
          {btnText || '提交'}
        </Button>
      </footer>
    </div>
  );
};

export default StepForm;
