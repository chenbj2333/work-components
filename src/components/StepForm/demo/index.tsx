import React, { FC, useState } from 'react';
import { Drawer, Button } from 'antd';
import StepForm from '..';
import baseJSON from './baseJSON';
import fubenJSON from './fubenJSON';

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
      status: 'process',
      name: '基础配置(必填)',
      dataWrapperName: 'baseInfo',
      data: baseJSON,
    },
    {
      key: 1,
      status: 'wait',
      name: '副本设置(必填)',
      dataWrapperName: 'fuben',
      data: fubenJSON,
    },
    // {
    //   key: 2,
    //   name: '调度设置(选填)',
    //   dataWrapperName: 'diaodu',
    //   data: baseJSON,
    // },
    // {
    //   key: 3,
    //   name: '健康检查设置(选填)',
    //   dataWrapperName: 'jiankang',
    //   data: baseJSON,
    // },
    // {
    //   key: 4,
    //   name: '存储及应用配置声明(选填)',
    //   dataWrapperName: 'storage',
    //   data: baseJSON,
    // },
    // {
    //   key: 5,
    //   name: '启动设置(选填)',
    //   dataWrapperName: 'start',
    //   data: baseJSON,
    // },
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
        <StepForm originStepInfoList={stepInfoList} onCloseFun={onClose} />
      </Drawer>
    </>
  );
};

export default StepFormDemo;
