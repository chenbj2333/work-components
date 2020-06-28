import React, { useState } from 'react';
import { Button, Progress } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

export interface IRefreshBtnProps {
  delay?: number;
}

const RefreshBtn: React.FC<IRefreshBtnProps> = ({ delay }) => {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);

  const getTimeFlag = () => {
    return time < 6 && time > 0;
  };

  const handleClick = () => {
    setLoading(true);
    const active = setInterval(() => {
      setTime((preSecond) => {
        if (preSecond >= 5) {
          console.log(preSecond);
          setLoading(false);
          clearInterval(active);
          setTime(0);
        }
        return preSecond + 1;
      });
    }, 1000);
  };

  return (
    <div>
      <Button
        icon={<ReloadOutlined style={getTimeFlag() ? { opacity: 0 } : {}} />}
        onClick={handleClick}
        disabled={loading}
        style={{ position: 'relative', width: 82 }}
      >
        {getTimeFlag() && (
          <Progress
            width={18}
            style={{ position: 'absolute', top: 2, left: 8 }}
            type='circle'
            percent={(time / (delay || 5)) * 100}
            format={(percent) => `${(percent || 0) / 20}`}
          />
        )}
        <span style={getTimeFlag() ? { marginLeft: 8 } : {}}>刷新</span>
      </Button>
    </div>
  );
};

export default RefreshBtn;
