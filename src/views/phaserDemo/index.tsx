import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { ground } from './ground';
import { plane, createMyPlane, createEnemyPlane } from './plane';
import { Missile } from './missile';

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
    Missile.preload(this, 29, 72, 'missile-1');
  }

  // 创建
  function create(this: Phaser.Scene) {
    // 创建背景
    bg = ground.create(this);
    // 创建预警机
    createMyPlane(this);
    // 创建敌机
    createEnemyPlane(this);
    // 引入导弹
    Missile.createMissile(
      this,
      [200, window.innerHeight / 2],
      [
        [window.innerWidth / 2, window.innerHeight / 2],
        [window.innerWidth - 200, window.innerHeight / 2 - 100],
      ],
      3000,
      90
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
      physics: {
        default: 'arcade',
        // arcade: {
        //   gravity: { y: 200 },
        // },
      },
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
