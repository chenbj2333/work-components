// 粒子系统
import React, { useEffect } from 'react';
import * as Cesium from 'cesium';

function computeEmitterModelMatrix() {
  var emitterModelMatrix = new Cesium.Matrix4();
  var translation = new Cesium.Cartesian3();
  var rotation = new Cesium.Quaternion();
  var hpr = new Cesium.HeadingPitchRoll();
  var trs = new Cesium.TranslationRotationScale();
  hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
  trs.translation = Cesium.Cartesian3.fromElements(-4.0, 0.0, 1.4, translation);
  trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

  return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
}

const Demo7: React.FC = () => {
  useEffect(() => {
    const viewer = new Cesium.Viewer('cesiumContainer', {
      imageryProvider: Cesium.createWorldImagery({
        style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
      }),
    });

    const start = Cesium.JulianDate.fromDate(new Date(2020, 11, 18, 15));
    const stop = Cesium.JulianDate.addSeconds(start, 60, new Cesium.JulianDate()); // 60秒停止

    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.clockRange = Cesium.ClockRange.CLAMPED; // 在终点停止
    viewer.clock.multiplier = 1;
    viewer.clock.shouldAnimate = true;

    //Set timeline to simulation bounds
    viewer.timeline.zoomTo(start, stop);

    var pos1 = Cesium.Cartesian3.fromDegrees(-75.15787310614596, 39.97862668312678);
    var pos2 = Cesium.Cartesian3.fromDegrees(-75.1633691390455, 39.95355089912078);
    var position = new Cesium.SampledPositionProperty();

    position.addSample(start, pos1);
    position.addSample(stop, pos2);

    const entity = viewer.entities.add({
      availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({
          start: start,
          stop: stop,
        }),
      ]),
      model: {
        uri: './CesiumMilkTruck.glb',
        minimumPixelSize: 64,
      },
      // viewFrom: new Cesium.Cartesian3(-100.0, 0.0, 100.0),
      position: position,
      orientation: new Cesium.VelocityOrientationProperty(position),
    });

    viewer.trackedEntity = entity;

    // var entity = viewer.entities.add({
    //   // availability: new Cesium.TimeIntervalCollection([
    //   //   new Cesium.TimeInterval({
    //   //     start: start,
    //   //     stop: stop,
    //   //   }),
    //   // ]),
    //   model: {
    //     uri: './CesiumMilkTruck.glb',
    //     minimumPixelSize: 48,
    //   },
    //   position: Cesium.Cartesian3.fromDegrees(-75.1633691390455, 39.95355089912078, 0),
    // });
    // viewer.trackedEntity = entity;

    // const particleSystem = viewer.scene.primitives.add(
    //   new Cesium.ParticleSystem({
    //     image: '../../assets/SampleData/smoke.png',
    //     startColor: Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
    //     endColor: Cesium.Color.WHITE.withAlpha(0.0),

    //     startScale: 1.0,
    //     endScale: 4.0,

    //     particleLife: 1.0,

    //     minimumSpeed: 1.0,
    //     maximumSpeed: 4.0,

    //     imageSize: new Cesium.Cartesian2(25, 25),
    //     emissionRate: 5.0,
    //     lifetime: 16.0,

    //     modelMatrix: entity.computeModelMatrix(viewer.clock.startTime, new Cesium.Matrix4()),
    //     emitterModelMatrix: computeEmitterModelMatrix(),
    //   })
    // );
  }, []);

  return <div id='cesiumContainer' style={{ width: '100%', height: '100vh' }}></div>;
};

export default Demo7;
