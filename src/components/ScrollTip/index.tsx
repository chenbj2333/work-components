/*
 * @Description: 随便写的demo，没什么用
 * @Author: ChenBingJie
 * @Date: 2020-12-14 15:42:16
 * @Last Modified by: ChenBingJie
 * @Last Modified time: 2020-12-14 16:32:05
 */

import useDeepCompareEffect from '@/hooks/useDeepCompareEffect';
import React, { useState } from 'react';

interface ScrollTipProps {
  msgList: any[];
  activeItem: any;
}

const ScrollTip: React.FC<ScrollTipProps> = ({ msgList = [], activeItem }) => {
  const [list, setList] = useState(msgList);

  useDeepCompareEffect(() => {
    if (activeItem) {
      const temp = list.filter((arrItem) => arrItem.id !== activeItem.id);
      temp.push(activeItem);
      setList(temp);
    }
  }, [activeItem]);

  return (
    <div style={{ position: 'relative' }}>
      {list.map((item: any, index: number) => (
        <div
          key={item.id}
          style={{
            width: 200,
            height: 200,
            color: '#fff',
            background: item.color,
            position: 'absolute',
            top: index * 10,
            left: index * 10,
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default ScrollTip;
