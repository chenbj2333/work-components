/*
 * @Description: 操作按钮组
 * @Author: ChenBingJie
 * @Date: 2020-05-13 11:36:25
 * @Last Modified by: ChenBingJie
 * @Last Modified time: 2020-05-15 10:47:57
 */
import React from 'react';
import { Button, Divider, Dropdown, Menu, Popconfirm, Modal } from 'antd';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { generateHash } from '@/utils';

interface IBtnItem {
  label: string;
  handleClk: (item?: any) => void;
  popconfirm?: {
    title: string;
    okText: string;
    cancelText: string;
  };
}

export interface IHandleBtnsProps {
  btns: IBtnItem[];
  dropdownName?: string;
}

const { confirm } = Modal;

const HandleBtns: React.FC<IHandleBtnsProps> = ({ btns, dropdownName }) => {
  const btnNum = btns.length;

  const content = () => {
    if (btnNum > 3) {
      const menu = (
        <Menu>
          {btns.length > 0 &&
            btns.map((btn) => (
              <Menu.Item key={generateHash()}>
                {btn.popconfirm ? (
                  <a
                    href='/#'
                    onClick={() => {
                      confirm({
                        title: btn.popconfirm?.title,
                        icon: <ExclamationCircleOutlined />,
                        okText: btn.popconfirm?.okText,
                        cancelText: btn.popconfirm?.cancelText,
                        onOk: btn.handleClk,
                      });
                    }}
                  >
                    {btn.label}
                  </a>
                ) : (
                  <a href='/#' onClick={btn.handleClk}>
                    {btn.label}
                  </a>
                )}
              </Menu.Item>
            ))}
        </Menu>
      );
      return (
        <Dropdown overlay={menu} trigger={['click']}>
          <a href='/#' onClick={(e) => e.preventDefault()}>
            {dropdownName || '操作列表'} <DownOutlined />
          </a>
        </Dropdown>
      );
    }
    return (
      <>
        {btns.length > 0 &&
          btns.map((btn, index) => (
            <span key={generateHash()}>
              {btn.popconfirm ? (
                <Popconfirm
                  title={btn.popconfirm.title}
                  onConfirm={btn.handleClk}
                  okText={btn.popconfirm.okText}
                  cancelText={btn.popconfirm.cancelText}
                >
                  <a href='/#'>{btn.label}</a>
                </Popconfirm>
              ) : (
                <Button type='link' onClick={btn.handleClk}>
                  {btn.label}
                </Button>
              )}
              {index + 1 < btnNum ? <Divider type='vertical' /> : null}
            </span>
          ))}
      </>
    );
  };

  return <>{content()}</>;
};

export default HandleBtns;
