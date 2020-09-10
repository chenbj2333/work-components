// 导弹
export class Missile {
  // 加载导弹图片
  static preload(
    _this: Phaser.Scene,
    width: number,
    height: number,
    name: string
  ) {
    const imageName = name.split('-')[0];
    return _this.load.spritesheet(name, `/images/${imageName}.png`, {
      frameWidth: width,
      frameHeight: height,
    });
  }

  // 创建导弹
  static create(
    _this: Phaser.Scene,
    position: [number, number],
    angle: number,
    name: string
  ) {
    const missile = _this.physics.add
      .image(position[0], position[1], name)
      .setScale(0.4);
    missile.rotation = Phaser.Math.DegToRad(angle);
    return missile;
  }

  // 导弹轨迹
  static flyingMissile(
    _missile: any,
    _this: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number
  ) {
    Phaser.Physics.Arcade.Sprite.call(_missile, _this, x, y, 'missile-1');
    //  This is the path the sprite will follow
    _missile.path = new Phaser.Curves.Ellipse(x, y, width, height);
    _missile.pathIndex = 0;
    _missile.pathSpeed = speed;
    _missile.pathVector = new Phaser.Math.Vector2();

    _missile.path.getPoint(0, _missile.pathVector);

    _missile.setPosition(_missile.pathVector.x, _missile.pathVector.y);
  }
}

// // 导弹路径
// // 引用方式
// // missile = Missile.createMissile(
// //   this,
// //   [200, window.innerHeight / 2],
// //   [
// //     [window.innerWidth / 2, window.innerHeight / 2],
// //     [window.innerWidth - 200, window.innerHeight / 2 - 100],
// //   ],
// //   3000,
// //   90
// // );
// static createMissile(
//   _this: Phaser.Scene,
//   startPosition: [number, number], // 起点坐标
//   path: number[][], // 运动路径，以终点结尾
//   duration: number, // 运行时间
//   angle: number // 角度
// ) {
//   const durationPath: Phaser.Math.Vector2[] = [];
//   path.forEach((item) => {
//     durationPath.push(new Phaser.Math.Vector2(item[0], item[1]));
//   });
//   const _path = new Phaser.Curves.Path(
//     startPosition[0],
//     startPosition[1]
//   ).splineTo(durationPath);
//   const graphics = _this.add.graphics();
//   graphics.lineStyle(1, 0xffffff, 1);
//   _path.draw(graphics, 128);
//   graphics.fillStyle(0x00ff00, 1);
//   const _missile = _this.add.follower(
//     _path,
//     200,
//     window.innerHeight / 2,
//     'missile-1'
//   );
//   _missile.setScale(0.4);

//   _missile.startFollow({
//     duration,
//     repeat: -1,
//     rotateToPath: true,
//     rotationOffset: angle,
//     ease: 'Sine.easeIn',
//   });

//   _missile.body = Missile.create(
//     _this,
//     [200, window.innerHeight / 2],
//     90,
//     'missile-1'
//   ).body;

//   return _missile;
// }
