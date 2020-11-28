// 相机
import React, { useEffect } from 'react';
import * as Cesium from 'cesium';

const Demo6: React.FC = () => {
  useEffect(() => {
    const viewer = new Cesium.Viewer('cesiumContainer', {
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali',
      }),
    });

    /**
     * 使用setView方法可以设置相机位置和朝向。
     * 需要传递的参数是目标点和朝向。
     * 位置参数需要传一个Cartesian3或者Rectangle类的实例。
     * 朝向要么是 heading/pitch/roll 欧拉角 ，要么是 朝向向量/向上向量。
     * heading/pitch/roll 的单位是弧度。
     * Heading是当前方向 由北向东旋转的角度。
     * Pitch 是方向和水平平面的夹角。
     * Pitch为正 表示方向向量指向水平平面上方，反之表示方向向量指向平面下方。
     * Roll 是方向向量以正东方向为轴的旋转角度。
     */
    // 相机垂直向下俯视，Heading设置为正北方向是最常见的设置参数
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(112.424777, 42.44077, 1000000), // 位置
      orientation: {
        heading: 0.0,
        pitch: -Cesium.Math.PI_OVER_TWO,
        roll: 0.0,
      },
    });
  }, []);

  return <div id='cesiumContainer' style={{ width: '100%', height: '100vh' }}></div>;
};

export default Demo6;
