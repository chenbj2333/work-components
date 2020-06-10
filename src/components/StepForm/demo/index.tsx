import React, { FC, useState } from 'react';
import { Drawer, Button } from 'antd';
import StepForm, { stepStatusType } from '..';
import axios from '../../../axios';
import DispatchSetting from './DispatchSetting';
import BaseSetting from './BaseSetting';
import CopySetting from './CopySetting';

const StepFormDemo: FC = () => {
  const [visible, setVisible] = useState(false);
  const [originData, setOriginData] = useState(null);
  const stepInfoList = [
    {
      key: 0,
      status: 'process' as stepStatusType,
      name: '基础配置(必填)',
      dataWrapperName: 'base',
      component: <BaseSetting dataWrapperName='base' originData={originData} />,
    },
    {
      key: 1,
      status: 'wait' as stepStatusType,
      name: '副本设置(必填)',
      dataWrapperName: 'copy',
      component: <CopySetting dataWrapperName='copy' originData={originData} />,
    },
    {
      key: 2,
      status: 'wait' as stepStatusType,
      name: '调度设置(选填)',
      dataWrapperName: 'dispatch',
      component: (
        <DispatchSetting dataWrapperName='dispatch' originData={originData} />
      ),
    },
    // {
    //   key: 1,
    //   status: 'wait' as stepStatusType,
    //   name: '健康检查设置(选填)',
    //   dataWrapperName: 'jiankang',
    //   component: (formRef: any) => (
    //     <DispatchSetting
    //       formRef={formRef}
    //       dataWrapperName='jiankang'
    //       originData={originData}
    //     />
    //   ),
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

  const showDrawer = () => {
    setVisible(true);
    setOriginData(null);
    // getApparafileList();
  };
  const showUpdateDrawer = () => {
    // getApparafileList();
    getOriginData({ applicationName: 'abc' });
  };
  const onClose = () => {
    setVisible(false);
  };

  // const getApparafileList = () => {
  //   axios({
  //     url: 'http://10.0.1.25:9999/api/application/apparafileList',
  //     method: 'get',
  //   }).then((res) => {
  //     setOriginData(res.data.data);
  //   });
  // };
  const getOriginData = (params: any) => {
    axios({
      url: 'http://10.0.1.25:9999/api/application/backUpdateApplication',
      method: 'get',
      params: params,
    }).then((res) => {
      setOriginData(res.data.data);
      setVisible(true);
    });
  };

  return (
    <>
      <Button type='primary' onClick={showDrawer}>
        Open
      </Button>
      <Button type='primary' onClick={showUpdateDrawer}>
        更新
      </Button>
      <Drawer
        title='Basic Drawer'
        placement='right'
        width={800}
        bodyStyle={{ padding: 0 }}
        onClose={onClose}
        visible={visible}
      >
        {visible && (
          <StepForm originStepInfoList={stepInfoList} onCloseFun={onClose} />
        )}
      </Drawer>
    </>
  );
};

export default StepFormDemo;
