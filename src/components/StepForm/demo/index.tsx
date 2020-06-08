import React, { FC, useState } from 'react';
import { Drawer, Button } from 'antd';
import StepForm from '..';
import FieldMessage from './fieldMessage';

const StepFormDemo: FC = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const stepInfoList = [
    {
      key: 0,
      name: '基础配置',
      isNeed: true,
      data: [
        {
          key: 'applicationName',
          type: 'input',
          label: '应用名',
          placeholder: 'Please input your applicationName',
          value: undefined,
          tipMsg: FieldMessage.applicationName,
          rules: [
            { required: true, message: 'Please input your applicationName!' },
          ],
        },
        {
          key: 'image',
          type: 'input',
          label: '镜像名',
          placeholder: 'Please input your image',
          value: undefined,
          tipMsg: FieldMessage.image,
          rules: [{ required: true, message: 'Please input your image!' }],
        },
        {
          key: 'imageTag',
          type: 'input',
          label: '镜像Tag',
          placeholder: 'Please input your imageTag',
          value: undefined,
          tipMsg: FieldMessage.imageTag,
          rules: [{ required: true, message: 'Please input your imageTag!' }],
        },
        {
          key: 'cpuResource',
          type: 'input',
          label: 'CPU核数(毫核)',
          placeholder: 'Please input your cpuResource',
          value: undefined,
          tipMsg: FieldMessage.cpuResource,
          rules: [
            { required: true, message: 'Please input your cpuResource!' },
          ],
        },
        {
          key: 'memoryResource',
          type: 'input',
          label: '内存容量(M)',
          placeholder: 'Please input your memoryResource',
          value: undefined,
          tipMsg: FieldMessage.memoryResource,
          rules: [
            { required: true, message: 'Please input your memoryResource!' },
          ],
        },
      ],
    },
    // { key: 1, name: '副本设置', isNeed: true, data: [] },
    // { key: 2, name: '调度设置', isNeed: false, data: {} },
    // { key: 3, name: '健康检查设置', isNeed: false, data: {} },
    // { key: 4, name: '存储及应用配置声明', isNeed: false, data: {} },
    // { key: 5, name: '启动设置', isNeed: false, data: {} },
  ];

  return (
    <>
      <Button type='primary' onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        title='Basic Drawer'
        placement='right'
        width={760}
        bodyStyle={{ padding: 0 }}
        onClose={onClose}
        visible={visible}
      >
        <StepForm stepInfoList={stepInfoList} onCloseFun={onClose} />
      </Drawer>
    </>
  );
};

export default StepFormDemo;
