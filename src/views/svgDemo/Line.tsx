/*
 * @Description: 飞机间的连线
 * @Author: ChenBingJie
 * @Date: 2020-10-12 14:15:40
 * @Last Modified by: ChenBingJie
 * @Last Modified time: 2020-10-12 14:25:08
 */

import React from 'react';

interface ILinkLineProps {
  type: 'dash' | 'solid'; // 虚线或实线
  points: [number, number, number, number]; // 坐标点，起点xy和终点xy
  lineWidth?: number; // 线的宽度默认为2
  lineColor?: string; // 线的颜色，默认 #90EE90
  way?: 'one-way' | 'two-way'; // 单项或双向
  speed?: string; // 箭头的运行速度，默认3秒
  distanceStep?: number; // 箭头消失离起点和终点的距离，默认8
  arrowColor?: string; // 箭头的颜色，默认 #32CD32
  arrowSize?: number; // 箭头大小, 默认 32
}

// 箭头图片 svg to base64
function arrowFun(arrowColor: string) {
  const svgStr =
    "<svg viewBox='0 0 1024 1024' width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M430.933333 490.666667L256 665.6 315.733333 725.333333l234.666667-234.666666L315.733333 256 256 315.733333l174.933333 174.933334z m256 0L512 665.6l59.733333 59.733333 234.666667-234.666666L576 256 512 315.733333l174.933333 174.933334z' fill='" +
    arrowColor +
    "'></path></svg>";
  const encodeSvg = encodeURIComponent(svgStr);
  return 'data:image/svg+xml;charset=utf-8,' + encodeSvg;
}

// svg路径
function getPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  delta: number
) {
  return `M${startX + delta} ${startY + delta} L${endX - delta} ${
    endY - delta
  }`;
}

const LinkLine: React.FC<ILinkLineProps> = ({
  type,
  points,
  lineWidth = 2,
  lineColor = '#90EE90',
  way = 'one-way',
  speed = '3s',
  distanceStep = 8,
  arrowColor = '#32CD32',
  arrowSize = 32,
}) => {
  // 计算消失的距离, 线段长度 / distanceStep
  const delta =
    Math.abs(
      Math.sqrt(
        Math.pow(points[2] - points[0], 2) + Math.pow(points[3] - points[1], 2)
      )
    ) / distanceStep;
  // 线段路径
  const paths = getPath(points[0], points[1], points[2], points[3], 0);
  // 箭头运动路径
  const aniPaths = getPath(points[0], points[1], points[2], points[3], delta);
  // 箭头反向运动路径
  const anirePaths = getPath(
    points[2],
    points[3],
    points[0],
    points[1],
    -delta
  );

  // 图片运动
  const imageItem = (animationPath: string) => {
    return (
      <image
        x={-arrowSize / 2}
        y={-arrowSize / 2}
        width={arrowSize}
        height={arrowSize}
        xlinkHref={arrowFun(arrowColor)}
      >
        <animateMotion
          dur={speed}
          repeatCount='indefinite'
          path={animationPath}
          rotate='auto'
        />
      </image>
    );
  };

  return (
    <svg style={{ width: '100%', height: '100vh' }}>
      <path
        d={paths}
        style={{ fill: 'none', stroke: lineColor, strokeWidth: lineWidth }}
        strokeDasharray={type === 'dash' ? '8 2' : undefined}
      />
      {way === 'one-way' ? (
        imageItem(aniPaths)
      ) : (
        <>
          {imageItem(aniPaths)}
          {imageItem(anirePaths)}
        </>
      )}
    </svg>
  );
};

export default LinkLine;
