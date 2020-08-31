import React, { useRef } from 'react';
import { Form, Button } from 'antd';
import './App.less';
import DynamicTable from './views/pages/DynamicTable';

function App() {
  const originData = [
    {
      uid: '1',
      resource: ['apps', 'application'],
      controls: ['add', 'delete'],
    },
    { uid: '2', resource: ['apps', 'appmatrix'], controls: ['add'] },
    { uid: '3', resource: ['apps', 'mission'], controls: ['add', 'edit'] },
  ];

  const selectOptions = [
    { value: 'add', label: '添加' },
    { value: 'edit', label: '编辑' },
    { value: 'delete', label: '删除' },
  ];

  const cascaderOptions = [
    {
      value: 'app',
      label: 'app',
      children: [
        {
          value: 'application',
          label: 'application',
        },
        {
          value: 'appmatrix',
          label: 'appmatrix',
        },
        {
          value: 'mission',
          label: 'mission',
        },
        {
          value: 'coremission',
          label: 'coremission',
        },
      ],
    },
    {
      value: 'storage',
      label: 'storage',
      children: [
        {
          value: 'pool',
          label: 'pool',
        },
        {
          value: 'volume',
          label: 'volume',
        },
      ],
    },
  ];

  // const [form] = Form.useForm();
  // const formRef = useRef(form);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div style={{ margin: 40, width: 720 }}>
      <Form name='basic' onFinish={onFinish}>
        <DynamicTable
          originData={originData}
          selectOptions={selectOptions}
          cascaderOptions={cascaderOptions}
        />
        <Form.Item>
          <Button style={{ marginTop: 24 }} type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
