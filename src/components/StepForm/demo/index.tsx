import React, { useState, useEffect, useReducer, createContext } from 'react';
import { message, Spin, Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import axios from '@/axios';
import useEventEmitter from '@/hooks/useEventEmitter';
import BaseSetting from './BaseSetting';
import CopySetting from './CopySetting';
import DispatchSetting from './DispatchSetting';
import { initialState, reducer } from './store';
import StepForm, { stepInfoItem, TStepStatusType } from '..';

export interface ICreateDeployProps {
  refreshFun: Function;
  applicationName: string;
  onClose: () => void;
}

export const itemLabel = (label: string, tipMsg?: string) => {
  if (tipMsg) {
    return (
      <span>
        <span style={{ marginRight: 4 }}>{label}</span>
        <Popover
          content={tipMsg}
          getPopupContainer={(trigger) => {
            return trigger.parentNode?.parentNode?.parentNode?.parentNode
              ?.parentNode as HTMLElement;
          }}
        >
          <QuestionCircleOutlined />
        </Popover>
      </span>
    );
  }
  return label;
};

export const DataContext: any = createContext(null);

const CreateDeploy: React.FC<ICreateDeployProps> = ({
  applicationName,
  onClose,
  refreshFun,
}) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [commonFormData, dispatch] = useReducer(reducer, initialState);
  const wrapperNames = [
    'base',
    'copy',
    'dispatch',
    'health',
    'storage',
    'launch',
  ];
  const applicationNameEmitter = useEventEmitter<string>();
  const [stepInfoList, setStepInfoList] = useState<stepInfoItem[]>([
    {
      key: 0,
      status: 'process' as TStepStatusType,
      name: '基础配置(必填)',
      dataWrapperName: wrapperNames[0],
      component: (
        <BaseSetting
          dataWrapperName={wrapperNames[0]}
          applicationNameEmitter={applicationNameEmitter}
        />
      ),
    },
    {
      key: 1,
      status: 'wait' as TStepStatusType,
      name: '副本设置(必填)',
      dataWrapperName: wrapperNames[1],
      component: <CopySetting dataWrapperName={wrapperNames[1]} />,
    },
    {
      key: 2,
      status: 'wait' as TStepStatusType,
      name: '调度设置(选填)',
      dataWrapperName: wrapperNames[2],
      component: <DispatchSetting dataWrapperName={wrapperNames[2]} />,
    },
  ]);
  applicationNameEmitter.useSubscription((value) => {
    if (value === 'changeAppName') {
      stepInfoList[1].status = 'wait';
      setStepInfoList([...stepInfoList]);
    }
  });

  // 处理提交表单数组类型
  const normalizedParams = (data: any): any => {
    const newArr: any[] = [];
    Object.keys(data).forEach((key) => {
      newArr.push({
        ...data[key],
      });
    });
    newArr.forEach((item) => {
      Object.keys(item).forEach((key: any) => {
        if (typeof item[key] === 'object') {
          Reflect.set(item, key, item[key].value);
        }
      });
    });
    return newArr.length > 0 ? newArr : null;
  };

  // 处理提交表单键值对类型
  const normalizedKYParams = (data: any): any => {
    const result: any = {};
    const list: any = [];
    Object.keys(data).forEach((key) => {
      list.push(data[key]);
    });
    list.forEach((item: any) => {
      result[item.nodeKey.value] = item.nodeValue.value;
    });
    return Object.keys(result).length > 0 ? result : null;
  };

  const submit = (values: any) => {
    let params: any = {};
    wrapperNames.forEach((name) => {
      params = {
        ...params,
        ...values[name],
      };
    });
    params.workerAffinity =
      params.workerAffinity && normalizedParams(params.workerAffinity);
    if (params.workerAffinity) {
      params.workerAffinity.forEach((item: any) => {
        Reflect.set(item, 'values', item.values.split(','));
      });
    }
    params.env = params.env && normalizedParams(params.env);
    params.volumeMounts =
      params.volumeMounts && normalizedParams(params.volumeMounts);
    params.volumes = params.volumes && normalizedParams(params.volumes);
    params.workerSelector =
      params.workerSelector && normalizedKYParams(params.workerSelector);
    console.log(params);
  };

  // 获取数据
  const getData = (name: string) => {
    const params = { applicationName: name };
    setLoading(true);
    setVisible(false);
    axios({
      url: 'http://10.0.1.25:9999/api/application/backUpdateApplication',
      method: 'delete',
      params,
    }).then((res: any) => {
      if (res.err) {
        message.error(res.err);
      } else {
        dispatch({
          type: 'getOriginData',
          payload: res.data,
        });
        setVisible(true);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (applicationName) {
      getData(applicationName);
    }
  }, [applicationName]);

  return (
    <Spin spinning={loading} style={{ width: '100%', margin: '100px auto' }}>
      {visible && (
        <DataContext.Provider value={{ commonFormData, dispatch }}>
          <StepForm
            originStepInfoList={stepInfoList}
            onCloseFun={() => {
              setVisible(false);
              onClose();
            }}
            submitFun={submit}
          />
        </DataContext.Provider>
      )}
    </Spin>
  );
};

export default CreateDeploy;
