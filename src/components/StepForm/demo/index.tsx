import React, { FC, useState, useReducer } from 'react';
import { Drawer, Button } from 'antd';
import StepForm, { stepStatusType } from '..';
import baseJSON from './baseJSON';
import fubenJSON from './fubenJSON';
import CreateAppBase from './base';

const StepFormDemo: FC = () => {
  const [visible, setVisible] = useState(false);
  const originData = {
    applicationName: undefined,
    image: undefined,
    imageTag: undefined,
    cpuResource: undefined,
    memoryResource: undefined,
    containerName: undefined,
    replicas: undefined,
    historyLimit: undefined,
    maxSurge: undefined,
    maxUnavailable: undefined,
    workerName: undefined,
    bindIp: undefined,
    workerSelector: null,
    workerAffinity: {
      key: undefined,
      operator: undefined,
    },
    host: undefined,
    path: undefined,
    port: undefined,
    failureThreshold: undefined,
    periodSeconds: undefined,
    timeoutSeconds: undefined,
    volumes: {
      type: undefined,
      sourceName: undefined,
      alias: undefined,
    },
    volumeMounts: {
      alias: undefined,
      mountPath: undefined,
      subPath: undefined,
    },
    env: {
      name: undefined,
      value: undefined,
    },
    envFrom: undefined,
    cmd: undefined,
  };
  // const contextValue = useReducer(reducer, originData);
  // const CountContext = React.createContext(contextValue);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const stepInfoList = [
    {
      key: 0,
      status: 'process' as stepStatusType,
      name: '基础配置(必填)',
      dataWrapperName: 'baseInfo',
      component: <CreateAppBase />,
    },
    // {
    //   key: 1,
    //   status: 'wait' as stepStatusType,
    //   name: '副本设置(必填)',
    //   dataWrapperName: 'fuben',
    //   data: fubenJSON,
    // },
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
        {/* <CountContext.Provider value={contextValue}> */}
        <StepForm originStepInfoList={stepInfoList} onCloseFun={onClose} />
        {/* </CountContext.Provider> */}
      </Drawer>
    </>
  );
};

export default StepFormDemo;
