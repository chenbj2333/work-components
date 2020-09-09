import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { ground } from './ground';
import { plane } from './plane';

const Demo1: React.FC = () => {
  let bg: any = null;
  // 加载
  function preload(this: any) {
    this.scale.scaleMode = Phaser.Scale.FIT;
    this.scale.refresh();
    ground.preload(this);
    plane.preload(this, 195, 195, 'demo');
    plane.preload(this, 195, 195, 'foePlane-1');
    plane.preload(this, 195, 195, 'foePlane-2');
  }

  // 创建
  function create(this: Phaser.Scene) {
    // this.add.image(0, 0, 'bg1').setOrigin(0, 0).setScale(5, 5);
    bg = ground.create(this);
    plane.create(this, [200, window.innerHeight / 2], 90, 'demo', 'fly');
    plane.create(
      this,
      [window.innerWidth - 200, window.innerHeight / 2 + 100],
      270,
      'foePlane-1'
    );
    plane.create(
      this,
      [window.innerWidth - 200, window.innerHeight / 2 - 100],
      270,
      'foePlane-2'
    );
  }

  // 更新
  function update(this: any) {
    bg.tilePositionX += 2;
  }

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      // physics: {
      //   default: 'arcade',
      //   arcade: {
      //     gravity: { y: 200 },
      //   },
      // },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };
    new Phaser.Game(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return <div id='stage' style={{ height: '100vh' }} />;
  return <div></div>;
};

export default Demo1;
