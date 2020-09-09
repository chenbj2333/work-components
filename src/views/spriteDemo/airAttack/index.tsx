import React, { useEffect } from 'react';
import { Scene, Sprite, Polyline } from 'spritejs';
import { createGround, createGroup } from './Groud';

const AirAttack: React.FC = () => {
  useEffect(() => {
    const container = document.querySelector('#stage');
    const scene = new Scene({
      container,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const layer = scene.layer();
    // const ground1 = createGround([0, 0], 'bg1');
    // const ground2 = createGround([0, -window.innerHeight], 'bg2');
    // const ground3 = createGround([0, -window.innerHeight * 2], 'bg3');

    // ground1.animate([{ pos: [0, 0] }, { pos: [0, window.innerHeight] }], {
    //   duration: 1000,
    //   iterations: Infinity,
    // });

    // ground1.setAttribute('position', [0, -window.innerHeight]);

    // ground2.animate(
    //   [{ pos: [0, -window.innerHeight] }, { pos: [0, window.innerHeight] }],
    //   {
    //     duration: 2000,
    //     iterations: Infinity,
    //   }
    // );

    // // ground3.animate(
    // //   [{ pos: [0, -window.innerHeight * 2] }, { pos: [0, window.innerHeight] }],
    // //   {
    // //     duration: 3000,
    // //     iterations: Infinity,
    // //   }
    // // );

    layer.append(createGroup());
  }, []);

  return <div id='stage' style={{ height: '100vh' }} />;
};

export default AirAttack;
