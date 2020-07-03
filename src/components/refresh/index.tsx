import React, { useState, useEffect, useMemo } from 'react';
import { Button, Progress } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

export interface IRefreshBtnProps {
  delay?: number;
  refreshFun: () => void;
  btnWidth?: number;
}

const RefreshBtn: React.FC<IRefreshBtnProps> = ({ delay = 5 }) => {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(delay);
  let timer: any = null;

  const handleClick = () => {
    setLoading(true);
    timer = setInterval(() => {
      setTime((preSecond) => {
        if (preSecond <= 1) {
          console.log(preSecond);
          setLoading(false);
          clearInterval(timer);
          setTime(delay);
        }
        return preSecond - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Button
        icon={<ReloadOutlined style={loading ? { opacity: 0 } : {}} />}
        onClick={handleClick}
        disabled={loading}
        style={{ position: 'relative', width: 82 }}
      >
        {loading && (
          <Progress
            width={18}
            style={{ position: 'absolute', top: 2, left: 8 }}
            type='circle'
            percent={(time / (delay || 5)) * 100}
            format={(percent) => `${(percent || 0) / 20}`}
          />
        )}
        <span style={loading ? { marginLeft: 8 } : {}}>刷新</span>
      </Button>
    </div>
  );
};

// const RefreshBtn: React.FC<IRefreshBtnProps> = ({
//   delay = 5,
//   refreshFun,
//   btnWidth = 82,
// }) => {
//   const [loading, setLoading] = useState(false);
//   let timer: any = null;
//   const borderRef: any = useRef();

//   const handleClick = () => {
//     setLoading(true);
//     refreshFun();
//     borderRef.current.style.width = `${btnWidth - 3}px`;
//     borderRef.current.style.transition = `width ${delay}s linear`;

//     let delayTime = delay;
//     timer = setInterval(() => {
//       delayTime -= 1;
//       if (delayTime <= 0) {
//         clearInterval(timer);
//         setLoading(false);
//         borderRef.current.style.width = 0;
//         borderRef.current.style.transition = null;
//       }
//     }, 1000);
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
//         style={{ position: 'relative', width: btnWidth }}
//       >
//         <span>刷新</span>
//         {/* {loading && ( */}
//         <div
//           ref={borderRef}
//           style={{
//             width: 0,
//             height: 3,
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             backgroundColor: '#3c8dbc',
//           }}
//         />
//         {/* )} */}
//       </Button>
//     </div>
//   );
// };

export default RefreshBtn;
