import React, { useEffect, useState } from 'react';
import { Select, Form } from 'antd';
import axios from '../../../axios';

const { Option } = Select;

export interface IDispatchSettingProps {
  formRef: any;
  dataWrapperName: string;
  originData: any;
}

const DispatchSetting: React.FC<IDispatchSettingProps> = ({
  formRef,
  dataWrapperName,
  originData,
}) => {
  console.log(originData);
  const [workList, setWorkList] = useState([]);
  const getWorkerList = () => {
    axios({
      url: 'http://10.0.1.25:9999/api/application/getWorkerList',
      method: 'get',
    }).then((res) => {
      setWorkList(res.data.data);
    });
  };

  useEffect(() => {
    getWorkerList();
  }, []);

  return (
    <>
      {originData && (
        <Form.Item
          label='workerName'
          name={[`${dataWrapperName}`, 'workerName']}
          rules={[{ required: true, message: '请选择节点名称!' }]}
          initialValue={originData['workerName']}
        >
          <Select placeholder='请选择节点名称'>
            {workList &&
              workList.map((op: any) => (
                <Option key={op.uid} value={op.workerName}>
                  {op.showWorkerName}
                </Option>
              ))}
          </Select>
        </Form.Item>
      )}
    </>
  );
};

export default DispatchSetting;
