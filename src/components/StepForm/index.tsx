import React, { FC, useState, useRef } from 'react';
import { Steps, Button, Form } from 'antd';
import './index.less';
import StepFormContent, { IStepFormContentItem } from './StepFormContent';

const { Step } = Steps;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export interface IStepFormProps {
  stepInfoList: {
    key: number;
    name: string;
    isNeed: boolean;
    description?: string;
    data: IStepFormContentItem[];
  }[];
  onCloseFun: () => void;
}

const StepForm: FC<IStepFormProps> = ({ stepInfoList, onCloseFun }) => {
  const [form] = Form.useForm();
  const formRef = useRef(form);
  const [current, setCurrent] = useState(stepInfoList[0]?.key);

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

  const handleChange = (current: number) => {
    console.log('onChange:', current);
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
                title={`${stepInfo.name}(${stepInfo.isNeed ? '必填' : '选填'})`}
                description={stepInfo.description}
                status={current === stepInfo.key ? 'process' : 'wait'}
                style={{ minHeight: 80 }}
              />
            ))}
          </Steps>
        </section>
        <div className='stepform-divider' />
        <section className='stepform-right'>
          <Form ref={formRef} onFinish={onFinish} {...layout}>
            {stepInfoList.map((stepInfo) => (
              <StepFormContent key={stepInfo.key} infoItem={stepInfo.data} />
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
