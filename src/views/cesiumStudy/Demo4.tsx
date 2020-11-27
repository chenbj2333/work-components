// ws修改数据
import React, { useEffect } from 'react';
import * as Cesium from 'cesium';

const Demo4: React.FC = () => {
  useEffect(() => {
    const viewer = new Cesium.Viewer('cesiumContainer', {
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali',
      }),
    });
    viewer.scene.camera.setView({
      //以中国原点坐标为中心点
      destination: Cesium.Cartesian3.fromDegrees(108.5525, 34.3227, 5000000.0),
    });
    function onChanged(collection: any, added: any, removed: any, changed: any) {
      var changemsg = 'change';
      for (let i = 0; i < changed.length; i++) {
        changemsg += '\n' + changed[i].id;
      }
      console.log(changemsg);
    }
    viewer.entities.collectionChanged.addEventListener(onChanged);
    const ws = new WebSocket('ws://10.0.1.140:1234/cesiumStudy/data');
    var heading = Cesium.Math.toRadians(-90.0);
    var pitch = Cesium.Math.toRadians(0.0);
    var roll = Cesium.Math.toRadians(0.0);
    ws.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      // viewer.entities.suspendEvents(); 和 viewer.entities.resumeEvents(); 属于优化
      // 先一个个更新，最后统一发消息效率更高
      viewer.entities.suspendEvents();
      data.forEach((item: any) => {
        // 如果实体存在则更新，如果不存在则创建
        const entity: Cesium.Entity | undefined = viewer.entities.getById(item.platFormId);
        if (entity) {
          entity.name = item.platformName;
          entity.description = (`platform: ${item.platformName}, Location: (${item.longitude}, ${item.latitude}, ${item.altitude})` as unknown) as Cesium.Property;
          entity.position = (Cesium.Cartesian3.fromDegrees(
            item.longitude,
            item.latitude,
            item.altitude
          ) as unknown) as Cesium.PositionProperty;
          entity.label!.text = item.platformName;
          // entity.merge({
          //   name: item.platformName,
          //   label: {
          //     text: item.platformName,
          //   },
          // } as Cesium.Entity);
        } else {
          viewer.entities.add({
            id: item.platFormId,
            name: item.platformName,
            description: `platform: ${item.platformName}, Location: (${item.longitude}, ${item.latitude}, ${item.altitude})`,
            position: Cesium.Cartesian3.fromDegrees(item.longitude, item.latitude, item.altitude),
            // point: { pixelSize: 10, color: Cesium.Color.RED.withAlpha(0.5) },
            model: {
              uri: '/shipold.gltf',
              scale: 30000,
            },
            orientation: (Cesium.Transforms.headingPitchRollQuaternion(
              Cesium.Cartesian3.fromDegrees(item.longitude, item.latitude, item.altitude),
              new Cesium.HeadingPitchRoll(heading, pitch, roll)
            ) as unknown) as Cesium.Property,
            label: {
              text: item.platformName,
              font: '14pt monospace',
            },
          });
        }
      });
      viewer.entities.resumeEvents();
    };
  }, []);

  return <div id='cesiumContainer' style={{ width: '100%', height: '100vh' }}></div>;
};

export default Demo4;
