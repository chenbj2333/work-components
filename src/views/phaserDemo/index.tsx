import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { ground } from './ground';
import { plane, createMyPlane, createEnemyPlane } from './plane';
import { Missile } from './missile';
import { loadObj } from './loadObject';
import { ControlEvent } from './control';
import { controlData } from './drawLine';
import { message } from 'antd';

const WIN_WIDTH = window.innerWidth;
const WIN_HEIGHT = window.innerHeight;

interface IFoe {
  key: string;
  originPos: number[];
  breakPos: number[];
  obj: Phaser.Physics.Arcade.Sprite;
  drone: number[][];
}

interface IMissile {
  key: string;
  obj: Phaser.Physics.Arcade.Sprite | Phaser.GameObjects.PathFollower;
  commuLine?: Phaser.GameObjects.Graphics;
  isOverlap: boolean;
  drone: number[][];
}

const Demo1: React.FC = () => {
  let bg: any = null; // 背景
  let planes: any = null; // 我方飞机
  let foes: IFoe[] = []; // 敌机
  const missiles: IMissile[] = [];
  let commuGraphics: any[] = []; // 通信连线
  let data: any = null;

  // 加载
  function preload(this: any) {
    this.scale.scaleMode = Phaser.Scale.FIT;
    this.scale.refresh();
    loadObj(this);
  }

  // 创建
  function create(this: Phaser.Scene) {
    const test = new WebSocket(`ws://localhost:1234/server/plane/demo`);
    test.onmessage = (evt: MessageEvent) => {
      const origin = JSON.parse(evt.data);
      if (origin.err) {
        message.error(origin.err);
      } else {
        data = origin;
        // console.log(origin);
        // if (!isEqual(origin, preData.current)) {
        //   preData.current = origin;
        //   setData(origin);
        //   setScene(origin.mode);
        // }
      }
    };
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
    if (data) {
      planes[data.name].drone.forEach((item: Phaser.Physics.Arcade.Sprite) => {
        const frame = data.status === 'normal' ? 0 : 1;
        item.setFrame(frame);
      });
    }
    bg.tilePositionX += 2;
    if (missiles.length > 0) {
      // 无人机通信跟随
      missiles.forEach((miss) => {
        if (!miss.isOverlap) {
          miss.commuLine?.destroy();
          miss.commuLine = this.add.graphics();
          let path = null;
          if (miss.obj.x < WIN_WIDTH / 2 + 50) {
            path = new Phaser.Curves.Line([
              ...miss.drone[0],
              miss.obj.x,
              miss.obj.y,
            ]);
          } else {
            path = new Phaser.Curves.Line([
              ...(miss.drone[1] || miss.drone[0]),
              miss.obj.x,
              miss.obj.y,
            ]);
          }
          miss.commuLine!.lineStyle(1, 0x00ff00, 1);
          path.draw(miss.commuLine!).setDepth(-1);
        }
      });
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
      probe(_this);
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
    if (foes.length > 0) {
      // 火力网
      const graphics = _this.add.graphics();
      graphics.lineStyle(1, 0xff0000, 1);

      foes.forEach((foe, index) => {
        const missPath = Missile.createMissilePath(
          [foe.originPos[0], foe.originPos[1]],
          [
            [foe.breakPos[0], foe.breakPos[1]],
            [foe.obj.x, foe.obj.y],
          ]
        );
        // 画火力网
        missPath.path.draw(graphics, 128).setDepth(-1);
        const missObj = Missile.createMissile(_this, missPath, 3000, 90);
        missiles.push({
          key: `missile-${index + 1}`,
          obj: missObj,
          isOverlap: false,
          drone: foe.drone,
        });
        overlap(_this, missObj, foe.obj, graphics);
      });
    }
  }

  function communication(_this: Phaser.Scene) {
    controlData(_this, planes, commuGraphics);
  }

  function probe(_this: Phaser.Scene) {
    const startPos = [600, WIN_HEIGHT / 2 - 150];
    const point1 = [0, 0];
    const point2 = [WIN_WIDTH - 720, -80];
    const point3 = [WIN_WIDTH - 720, 80];

    var probeNet = _this.add
      .triangle(...startPos, ...point1, ...point2, ...point3, 0x6666ff)
      .setOrigin(0, 0)
      .setAlpha(0.6)
      .setScale(0);

    _this.tweens.add({
      targets: probeNet,
      scale: 1,
      repeat: 0,
      ease: 'Sine.easeInOut',
      onComplete: function () {
        console.log('complete');
      },
    });

    _this.tweens.add({
      targets: probeNet,
      alpha: 0.2,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  function overlap(
    _this: Phaser.Scene,
    missile: any,
    target: any,
    graphics?: any
  ) {
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
            graphics?.destroy();
            missile.destroy();
            missiles.forEach((miss) => {
              miss.commuLine?.destroy();
              miss.isOverlap = true;
            });
            missiles.length = 0;
            foes.length = 0;
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
