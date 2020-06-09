import React, { FC, useState, useRef } from 'react';
import { Steps, Button, Form } from 'antd';
import './index.less';
import StepFormContent, { IStepFormContentItem } from './StepFormContent';

const { Step } = Steps;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export type stepStatusType =
  | 'error'
  | 'wait'
  | 'process'
  | 'finish'
  | undefined;

export interface IStepFormProps {
  originStepInfoList: {
    key: number;
    name: string;
    status: stepStatusType;
    description?: string;
    dataWrapperName: string;
    data: IStepFormContentItem[];
  }[];
  onCloseFun: () => void;
}

const StepForm: FC<IStepFormProps> = ({ originStepInfoList, onCloseFun }) => {
  const [form] = Form.useForm();
  const formRef = useRef(form);
  const [current, setCurrent] = useState(originStepInfoList[0]?.key);
  const [stepInfoList, setStepInfoList] = useState(originStepInfoList);

  // 上一步
  const prevClick = () => {
    handleChange(current - 1);
  };
  // 下一步
  const nextClick = () => {
    handleChange(current + 1);
  };

  // 提交
  const submitClick = () => {
    formRef.current.submit();
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

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
    const newData: any[] = JSON.parse(JSON.stringify(stepInfoList));
    errNames.forEach((name) => {
      newData.forEach((info) => {
        if (name === info.dataWrapperName) {
          info.status = 'error';
        }
      });
    });
    setStepInfoList(newData);
  };

  const handleChange = (current: number) => {
    console.log('onChange:', current);
    const newData: any[] = JSON.parse(JSON.stringify(stepInfoList));
    newData.forEach((item) => {
      if (item.status !== 'error') {
        item.status = 'wait';
      }
      if (item.key === current) {
        item.status = 'process';
      }
    });
    setStepInfoList(newData);
    setCurrent(current);
  };

  return (
    <div className='stepform-wrapper'>
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
            {stepInfoList.map((stepInfo) => (
              <div
                key={stepInfo.key}
                style={
                  current === stepInfo.key
                    ? { display: 'block' }
                    : { display: 'none' }
                }
              >
                <StepFormContent
                  dataWrapperName={stepInfo.dataWrapperName}
                  infoItem={stepInfo.data}
                />
              </div>
            ))}
          </Form>
        </section>
      </section>
      <footer className='stepform-footer'>
        <Button className='stepform-footer-btn' onClick={onCloseFun}>
          取消
        </Button>
        {current !== 0 && (
          <Button className='stepform-footer-btn' onClick={prevClick}>
            上一步
          </Button>
        )}
        {current !== stepInfoList.length - 1 && (
          <Button
            type='primary'
            className='stepform-footer-btn'
            onClick={nextClick}
          >
            下一步
          </Button>
        )}
        <Button
          type='primary'
          className='stepform-footer-btn'
          onClick={submitClick}
        >
          提交
        </Button>
      </footer>
    </div>
  );
};

export default StepForm;
