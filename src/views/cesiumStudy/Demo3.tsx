import React, { useEffect } from 'react';
import * as Cesium from 'cesium';

const Demo3: React.FC = () => {
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
        height: 0,
        material: Cesium.Color.RED.withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      },
      position: Cesium.Cartesian3.fromDegrees(-107.724, 42.68),
      description: `<p>
      Wyoming is a state in the mountain region of the Western 
      United States.
    </p>
    <p>
      Wyoming is the 10th most extensive, but the least populous 
      and the second least densely populated of the 50 United 
      States. The western two thirds of the state is covered mostly 
      with the mountain ranges and rangelands in the foothills of 
      the eastern Rocky Mountains, while the eastern third of the 
      state is high elevation prairie known as the High Plains. 
      Cheyenne is the capital and the most populous city in Wyoming, 
      with a population estimate of 62,448 in 2013.
    </p>`,
    });

    // viewer.flyTo(wyoming).then(function (result) {
    //   if (result) {
    //     viewer.selectedEntity = wyoming;
    //   }
    // });
    viewer.trackedEntity = wyoming;
  }, []);

  return <div id='cesiumContainer' style={{ width: '100%', height: '100vh' }}></div>;
};

export default Demo3;
