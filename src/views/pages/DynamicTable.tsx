import React from 'react';
import { useDynamicList } from 'ahooks';
import { Form, Button, Table, Select, Cascader } from 'antd';
import { generateHash } from '@/utils';

interface IDynamicTableProps {
  originData: any;
  selectOptions: any;
  cascaderOptions: any;
}

const DynamicTable: React.FC<IDynamicTableProps> = ({
  originData,
  selectOptions,
  cascaderOptions,
}) => {
  const { list, remove, push } = useDynamicList<any>(originData);

  const columns = [
    {
      title: '资源',
      dataIndex: 'resource',
      key: 'resource',
      render: (text: string, row: any, index: number) => (
        <Form.Item
          name={['resource', `${row.uid}`]}
          initialValue={row.resource}
          rules={[{ required: true, message: 'Please input resource' }]}
        >
          <Cascader style={{ width: 320 }} options={cascaderOptions} />
        </Form.Item>
      ),
    },
    {
      key: 'controls',
      title: '操作权限',
      dataIndex: 'controls',
      render: (text: string, row: any, index: number) => (
        <div style={{ display: 'flex' }}>
          <Form.Item
            name={['controls', `${row.uid}`]}
            initialValue={row.controls}
            rules={[{ required: true, message: 'Please input resource' }]}
          >
            <Select
              mode='multiple'
              placeholder='Please select'
              style={{ width: 320 }}
            >
              {selectOptions.map((item: any) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type='link' onClick={() => remove(index)}>
              删除
            </Button>
          </Form.Item>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={list}
        rowKey='uid'
        pagination={false}
      />
      <Button
        style={{ marginTop: 8 }}
        block
        type='dashed'
        onClick={() =>
          push({ uid: generateHash(), resource: [], controls: [] })
        }
      >
        + 添加权限
      </Button>
    </>
  );
};

export default DynamicTable;
