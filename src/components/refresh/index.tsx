import React, { useState } from 'react';
import { Button, Progress } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

export interface IRefreshBtnProps {
  delay?: number;
}

const RefreshBtn: React.FC<IRefreshBtnProps> = ({ delay }) => {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);

  const handleClick = () => {
    setLoading(true);
    const active = setInterval(() => {
      setTime((preSecond) => {
        if (preSecond >= 995) {
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
        icon={
          <ReloadOutlined
          // style={time > 5 || time < 1 ? { opacity: 0 } : null}
          />
        }
        onClick={handleClick}
        disabled={loading}
        style={{ position: 'relative' }}
      >
        {time < 996 && time > 0 && (
          <Progress
            width={18}
            style={{ position: 'absolute', top: 2, left: 8 }}
            type='circle'
            percent={(time / (delay || 5)) * 100}
            format={(percent) => `${(percent || 0) / 20}`}
          />
        )}
        刷新
      </Button>
    </div>
  );
};

export default RefreshBtn;
