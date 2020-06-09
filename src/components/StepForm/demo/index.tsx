import React, { FC, useState } from 'react';
import { Drawer, Button } from 'antd';
import StepForm, { stepStatusType } from '..';
import baseJSON from './baseJSON';
import fubenJSON from './fubenJSON';
import axios from '../../../axios';
import { diaoduJSON, diaoduFormItemTemplate } from './diaoduJSON';

const StepFormDemo: FC = () => {
  const [visible, setVisible] = useState(false);
  const [stepInfoList, setStepInfoList] = useState([
    {
      key: 0,
      status: 'process' as stepStatusType,
      name: '基础配置(必填)',
      dataWrapperName: 'baseInfo',
      data: baseJSON,
    },
    {
      key: 1,
      status: 'wait' as stepStatusType,
      name: '副本设置(必填)',
      dataWrapperName: 'fuben',
      data: fubenJSON,
    },
    {
      key: 2,
      status: 'wait' as stepStatusType,
      name: '调度设置(选填)',
      dataWrapperName: 'diaodu',
      data: diaoduJSON,
    },
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
  ]);
  const [originData, setOriginData] = useState(null);

  const showDrawer = () => {
    setVisible(true);
    getWorkerList();
    setOriginData(null);
    // getApparafileList();
  };
  const showUpdateDrawer = () => {
    setVisible(true);
    getWorkerList();
    // getApparafileList();
    getOriginData({ applicationName: 'abc' });
  };
  const onClose = () => {
    setVisible(false);
  };

  const getWorkerList = () => {
    axios({
      url: 'http://10.0.1.25:9999/api/application/getWorkerList',
      method: 'get',
    }).then((res) => {
      // @ts-ignore
      stepInfoList[2].data[0].options = res.data.data;
      setStepInfoList([...stepInfoList]);
    });
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
        width={760}
        bodyStyle={{ padding: 0 }}
        onClose={onClose}
        visible={visible}
      >
        {visible && (
          <StepForm
            originStepInfoList={stepInfoList}
            onCloseFun={onClose}
            originData={originData}
          />
        )}
      </Drawer>
    </>
  );
};

export default StepFormDemo;
