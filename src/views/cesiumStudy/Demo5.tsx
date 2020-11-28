// 影像图层和地形图层
import React, { useEffect } from 'react';
import * as Cesium from 'cesium';

const Demo5: React.FC = () => {
  useEffect(() => {
    const viewer = new Cesium.Viewer('cesiumContainer', {
      imageryProvider: Cesium.createWorldImagery({
        style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
      }),
      baseLayerPicker: false,
      terrainProvider: Cesium.createWorldTerrain({
        requestVertexNormals: true, // 光照
        requestWaterMask: true, // 水面效果
      }),
    });
    viewer.scene.globe.enableLighting = true;
    // 添加另一个图层，需要在cesium ion中添加，否则此图层无法显示
    var layers = viewer.scene.imageryLayers;
    var blackMarble = layers.addImageryProvider(new Cesium.IonImageryProvider({ assetId: 3812 }));
    // 调整该图层透明度
    blackMarble.alpha = 0.5;
    // > 1.0 增加亮度 < 1.0减少亮度
    blackMarble.brightness = 2.0;
  }, []);

  return <div id='cesiumContainer' style={{ width: '100%', height: '100vh' }}></div>;
};

export default Demo5;
