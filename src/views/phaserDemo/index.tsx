import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { ground } from './ground';
import { plane, createMyPlane, createEnemyPlane } from './plane';
import { Missile } from './missile';
import { loadObj } from './loadObject';
import { ControlEvent } from './control';
import { controlData } from './drawLine';

const WIN_WIDTH = window.innerWidth;
const WIN_HEIGHT = window.innerHeight;

const Demo1: React.FC = () => {
  let bg: any = null; // 背景
  let planes: any = null; // 我方飞机
  let foes: any = null; // 敌机
  let missile1: any = null; // 导弹
  let commuLine1: any = null; // 导弹连线
  let isOverlap: boolean = false; // 是否碰撞
  let commuGraphics: any[] = []; // 通信连线

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
    planes = createMyPlane(this);
    // 创建敌机
    foes = createEnemyPlane(this);
    // 操作
    controls(this);
  }

  // 更新
  function update(this: any) {
    bg.tilePositionX += 2;
    if (missile1 && !isOverlap) {
      commuLine1?.destroy();
      commuLine1 = this.add.graphics();
      let path = null;
      if (missile1.x < WIN_WIDTH / 2 + 50) {
        path = new Phaser.Curves.Line([
          500,
          WIN_HEIGHT / 2 - 250,
          missile1.x,
          missile1.y,
        ]);
      } else {
        path = new Phaser.Curves.Line([
          600,
          WIN_HEIGHT / 2 - 150,
          missile1.x,
          missile1.y,
        ]);
      }
      commuLine1.lineStyle(1, 0x00ff00, 1);
      path.draw(commuLine1).setDepth(-1);
    }
  }

  function controls(_this: Phaser.Scene) {
    // 火力网
    const attackBtn = new ControlEvent(_this, 'fire', WIN_WIDTH - 400);
    attackBtn.onEvent('pointerdown', () => {
      attackBtn.setObjFrame(0);
      fireMissile(_this);
    });
    attackBtn.onEvent('pointerup', () => attackBtn.setObjFrame(1));
    // 通信网
    const communBtn = new ControlEvent(_this, 'commu', WIN_WIDTH - 320);
    communBtn.onEvent('pointerdown', () => {
      communBtn.setObjFrame(0);
      communication(_this);
    });
    communBtn.onEvent('pointerup', () => communBtn.setObjFrame(1));
    // 探测网
    const probeBtn = new ControlEvent(_this, 'probe', WIN_WIDTH - 240);
    probeBtn.onEvent('pointerdown', () => {
      probeBtn.setObjFrame(0);
    });
    probeBtn.onEvent('pointerup', () => probeBtn.setObjFrame(1));
    // 干扰网
    const interfBtn = new ControlEvent(_this, 'interf', WIN_WIDTH - 160);
    interfBtn.onEvent('pointerdown', () => {
      interfBtn.setObjFrame(0);
    });
    interfBtn.onEvent('pointerup', () => interfBtn.setObjFrame(1));
  }

  function fireMissile(_this: Phaser.Scene) {
    const { foe1, foe2 } = foes;
    if (foe1 && foe2) {
      isOverlap = false;
      const pathObj1 = Missile.createMissilePath(
        [300, WIN_HEIGHT / 2 - 250],
        [
          [WIN_WIDTH / 2, WIN_HEIGHT / 2 - 150],
          [foe1.x, foe1.y],
        ]
      );
      const pathObj2 = Missile.createMissilePath(
        [300, WIN_HEIGHT / 2 + 250],
        [
          [WIN_WIDTH / 2, WIN_HEIGHT / 2 + 150],
          [foe2.x, foe2.y],
        ]
      );
      // 火力网
      // const graphics = _this.add.graphics();
      // graphics.lineStyle(1, 0xff0000, 1);
      // pathObj1.path.draw(graphics, 128).setDepth(-1);
      // pathObj2.path.draw(graphics, 128).setDepth(-1);
      // 引入导弹
      missile1 = Missile.createMissile(_this, pathObj1, 3000, 90);
      const missile2 = Missile.createMissile(_this, pathObj2, 3000, 90);
      overlap(_this, missile1, 'foe1');
      overlap(_this, missile2, 'foe2');
    }
  }

  function communication(_this: Phaser.Scene) {
    controlData(_this, planes, commuGraphics);
  }

  function overlap(
    _this: Phaser.Scene,
    missile: any,
    target: string,
    graphics?: any
  ) {
    _this.physics.add.overlap(
      missile,
      foes[target],
      function () {
        missile.destroy();
        foes[target].life = foes[target].life - 1;
        if (foes[target].life <= 0) {
          foes[target].destroy();
          // 在敌机消失的位置上新增加一个精灵，用来展示帧动画
          const pos: [number, number] = [foes[target].x, foes[target].y];
          const enemyFrame = plane
            .createExplose(_this, pos, 270, 'explose', 'enemyBoom')
            .setDepth(1);
          enemyFrame.anims.play(`enemyBoom`);
          enemyFrame.once('animationcomplete', function () {
            enemyFrame.destroy();
            graphics?.destroy();
            commuLine1?.destroy();
            isOverlap = true;
            foes[target] = null;
          });
        }
      },
      undefined,
      _this
    );
  }

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: WIN_WIDTH,
      height: WIN_HEIGHT,
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
