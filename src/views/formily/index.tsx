import React from 'react';
import { Form, FormItem, FormButtonGroup, Submit, Reset } from '@formily/antd';
import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating,
} from '@formily/antd-components';

const FormilyDemo: React.FC = () => {
  return (
    <Form labelCol={5} wrapperCol={14} onSubmit={(values) => console.log(values)}>
      <FormItem label='应用名' name='applicationName' component={Input} description='应用的唯一标识，不能重复' />
      <FormButtonGroup offset={5}>
        <Submit>查询</Submit>
      </FormButtonGroup>
    </Form>
  );
};

export default FormilyDemo;
