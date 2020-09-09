import React, { useEffect } from 'react';
import { Scene, Sprite, Polyline } from 'spritejs';

const Demo1: React.FC = () => {
  useEffect(() => {
    const container = document.querySelector('#stage');
    const scene = new Scene({
      container,
      width: window.innerWidth,
      height: window.innerHeight,
      mode: 'stickyTop',
    });

    const layer = scene.layer();
    const robot = createPlane();

    layer.append(robot);
    const line = new Polyline({
      pos: [250, 50],
      points: [0, 0, 600, 0],
      strokeColor: 'blue',
      lineWidth: 3,
    });
    layer.append(line);

    const line1 = new Polyline({
      pos: [250, 50],
      points: [0, 0, 20, 0],
      strokeColor: 'red',
      lineWidth: 3,
    });
    line1.animate([{ pos: [250, 50] }, { pos: [750, 50] }], {
      duration: 2000,
      iterations: Infinity,
      direction: 'alternate', // normal默认值。动画应该正常播放。|alternate动画应该轮流反向播放。
    });
    layer.append(line1);
  }, []);

  return <div id='stage' style={{ height: '100vh' }} />;
};

export default Demo1;

function createPlane() {
  const robot = new Sprite('https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png');

  robot.attr({
    anchor: [0, 0],
    pos: [200, 400],
    size: [100, 100],
  });

  robot.animate([{ pos: [0, window.innerHeight] }, { pos: [200, 400] }], {
    duration: 3000,
    // iterations: Infinity,
    // direction: 'alternate', // normal默认值。动画应该正常播放。|alternate动画应该轮流反向播放。
  });

  return robot;
}

function createArrowLine() {}
