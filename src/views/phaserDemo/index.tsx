import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { ground } from './ground';
import { plane, createMyPlane, createEnemyPlane } from './plane';
import { Missile } from './missile';
import { loadObj } from './loadObject';
import { ControlEvent } from './control';

const Demo1: React.FC = () => {
  let bg: any = null;
  let missile: any = null;
  let foe: any = null;

  // 加载
  function preload(this: any) {
    this.scale.scaleMode = Phaser.Scale.FIT;
    this.scale.refresh();
    loadObj(this);
  }

  // 创建
  function create(this: Phaser.Scene) {
    // 创建背景
    bg = ground.create(this);
    // 创建预警机
    createMyPlane(this);
    // 创建敌机
    foe = createEnemyPlane(this);
    // 操作
    const clickBtn = new ControlEvent(
      this,
      '发射导弹',
      [window.innerWidth / 2, window.innerHeight - 100],
      '#ff0000',
      '16px',
      1
    );
    clickBtn.onEvent('pointerdown', () => {
      fireMissile(this);
    });
  }

  // 更新
  function update(this: any) {
    bg.tilePositionX += 2;
  }

  function fireMissile(_this: Phaser.Scene) {
    const target = foe[0];
    if (target) {
      // 引入导弹
      missile = Missile.create(
        _this,
        [200, window.innerHeight / 2],
        90,
        'missile-1'
      );
      _this.physics.accelerateToObject(missile, target, 200, 500, 500);
      // this.physics.moveToObject(missile, foe, 400);
      _this.physics.add.overlap(
        missile,
        target,
        function () {
          missile.destroy();
          target.life = target.life - 1;
          if (target.life <= 0) {
            target.destroy();
            // 在敌机消失的位置上新增加一个精灵，用来展示帧动画
            const pos: [number, number] = [target.x, target.y];
            const enemyFrame = plane
              .createExplose(_this, pos, 270, 'explose', 'enemyBoom')
              .setDepth(1);
            enemyFrame.anims.play(`enemyBoom`);
            enemyFrame.once('animationcomplete', function () {
              enemyFrame.destroy();
              foe.shift();
            });
          }
        },
        undefined,
        _this
      );
    }
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

  return <div></div>;
};

export default Demo1;
