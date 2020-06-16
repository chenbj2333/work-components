import React from 'react';
import { Button, Divider } from 'antd';
import axios from '..';

const AxiosDemo: React.FC = () => {
  const getClick = () => {
    axios({
      url: 'http://10.0.1.26:9999/api/demo/getList',
      method: 'get',
      params: {
        name: 'abc',
        page: '1',
        pageSize: '10',
      },
    }).then((res) => {
      console.log(res);
    });
  };

  const postClick = () => {
    axios({
      url: 'http://10.0.1.26:9999/api/demo/createObj',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      data: {
        id: 'postid12345',
        name: '5#冷库-低温库',
        duration_memo: '1小时23分',
      },
    }).then((res) => {
      console.log(res);
    });
  };

  const putClick = () => {
    axios({
      url: 'http://10.0.1.26:9999/api/demo/updateObj',
      method: 'put',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      data: {
        id: 'putid12345',
        name: '5#冷库-低温库',
        duration_memo: '1小时23分',
      },
    }).then((res) => {
      console.log(res);
    });
  };

  const deleteClick = () => {
    axios({
      url: 'http://10.0.1.26:9999/api/demo/deleteObj',
      method: 'delete',
      params: {
        id: 'deleteid12345',
      },
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <Button type='primary' onClick={getClick}>
        get request
      </Button>
      <Divider type='vertical' />
      <Button onClick={postClick}>post request</Button>
      <Divider type='vertical' />
      <Button type='dashed' onClick={putClick}>
        put request
      </Button>
      <Divider type='vertical' />
      <Button type='primary' danger onClick={deleteClick}>
        delete request
      </Button>
    </div>
  );
};

export default AxiosDemo;
