import React, { useState, useEffect, useRef } from 'react';
import { Button, Progress } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import './index.less';

export interface IRefreshBtnProps {
  delay?: number;
  refreshFun: () => void;
  btnWidth?: number;
  btnHeight?: number;
}

// const RefreshBtn: React.FC<IRefreshBtnProps> = ({ delay = 5 }) => {
//   const delayTime = delay * 100;
//   const [loading, setLoading] = useState(false);
//   const [time, setTime] = useState(delayTime);
//   let timer: any = null;

//   const handleClick = () => {
//     setLoading(true);
//     timer = setInterval(() => {
//       setTime((preSecond) => {
//         if (preSecond <= 1) {
//           console.log(preSecond);
//           setLoading(false);
//           clearInterval(timer);
//           setTime(delayTime);
//         }
//         return preSecond - 1;
//       });
//     }, 10);
//   };

//   useEffect(() => {
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div>
//       <Button
//         icon={<ReloadOutlined style={loading ? { opacity: 0 } : {}} />}
//         onClick={handleClick}
//         disabled={loading}
//         style={{ position: 'relative', width: 82 }}
//       >
//         {loading && (
//           <Progress
//             width={18}
//             style={{ position: 'absolute', top: 2, left: 8 }}
//             type='circle'
//             percent={(1 - time / (delayTime || 500)) * 100}
//             format={(percent) =>
//               `${((time / (delayTime || 500)) * 5).toFixed(0)}`
//             }
//           />
//         )}
//         <span style={loading ? { marginLeft: 8 } : {}}>刷新</span>
//       </Button>
//     </div>
//   );
// };

const RefreshBtn: React.FC<IRefreshBtnProps> = ({
  delay = 5,
  refreshFun,
  btnWidth = 82,
  btnHeight = 32,
}) => {
  const [loading, setLoading] = useState(false);
  let timer: any = null;
  const borderRef: any = useRef();

  const handleClick = () => {
    setLoading(true);
    refreshFun();
    borderRef.current.style.width = `${btnWidth - 3}px`;
    borderRef.current.style.transition = `width ${delay}s linear`;

    let delayTime = delay;
    timer = setInterval(() => {
      delayTime -= 1;
      if (delayTime <= 0) {
        clearInterval(timer);
        setLoading(false);
        borderRef.current.style.width = 0;
        borderRef.current.style.transition = null;
      }
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Button
        icon={<ReloadOutlined />}
        disabled={loading}
        style={{ width: btnWidth }}
      >
        <span>刷新</span>
      </Button>
      <div
        ref={borderRef}
        style={{ width: btnWidth, height: btnHeight }}
        className='btn-border draw'
        onClick={handleClick}
      />
    </div>
  );
};

export default RefreshBtn;
