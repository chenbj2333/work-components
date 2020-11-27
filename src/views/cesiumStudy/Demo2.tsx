import React, { useEffect } from 'react';
import * as Cesium from 'cesium';

const Demo2: React.FC = () => {
  useEffect(() => {
    const viewer = new Cesium.Viewer('cesiumContainer', {
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali',
      }),
    });

    // 矩形
    const wyoming = viewer.entities.add({
      polygon: {
        hierarchy: new Cesium.PolygonHierarchy(
          Cesium.Cartesian3.fromDegreesArray([
            -109.080842,
            45.002073,
            -105.91517,
            45.002073,
            -104.058488,
            44.996596,
            -104.053011,
            43.002989,
            -104.053011,
            41.003906,
            -105.728954,
            40.998429,
            -107.919731,
            41.003906,
            -109.04798,
            40.998429,
            -111.047063,
            40.998429,
            -111.047063,
            42.000709,
            -111.047063,
            44.476286,
            -111.05254,
            45.002073,
          ])
        ),
        height: 250000,
        extrudedHeight: 500000, // 加了这个属性，矩形会变成立方体， 高度从250000到500000
        material: Cesium.Color.RED.withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      },
    });

    // 椭圆
    const ellipseEntity = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
      ellipse: {
        semiMinorAxis: 250000.0,
        semiMajorAxis: 400000.0,
        outline: true,
        outlineColor: Cesium.Color.YELLOW,
        // material: new Cesium.ImageMaterialProperty({ image: '/logo192.png' }), 图片
        material: new Cesium.GridMaterialProperty({
          color: Cesium.Color.YELLOW,
          cellAlpha: 0.2,
          lineCount: new Cesium.Cartesian2(8, 8),
          lineThickness: new Cesium.Cartesian2(1.0, 1.0),
        }),
      },
    });

    // 折现
    const polylineEntity = viewer.entities.add({
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([-77, 35, -77.1, 35]),
        width: 10,
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.5,
          color: Cesium.Color.BLUE,
        }),
      },
    });

    viewer.zoomTo(wyoming);
  }, []);

  return <div id='cesiumContainer' style={{ width: '100%', height: '100vh' }}></div>;
};

export default Demo2;
