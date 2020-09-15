// 飞机
export const plane = {
  create: function (
    _this: Phaser.Scene,
    position: [number, number],
    angle: number,
    name: string,
    frameName?: string
  ) {
    const plane = _this.physics.add
      .sprite(position[0], position[1], name)
      .setScale(0.5, 0.5);
    plane.rotation = Phaser.Math.DegToRad(angle);
    (plane as any).life = 1;
    if (frameName) {
      _this.anims.create({
        key: frameName,
        frames: _this.anims.generateFrameNumbers(name, { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });
      plane.anims.play(frameName);
    }
    return plane;
  },
  createExplose: function (
    _this: Phaser.Scene,
    position: [number, number],
    angle: number,
    name: string,
    frameName?: string
  ) {
    const plane = _this.physics.add
      .sprite(position[0], position[1], name)
      .setScale(0.5, 0.5);
    plane.rotation = Phaser.Math.DegToRad(angle);
    if (frameName) {
      _this.anims.create({
        key: frameName,
        frames: _this.anims.generateFrameNumbers(name, { start: 0, end: 2 }),
        frameRate: 10,
        repeat: 0,
      });
      plane.anims.play(frameName);
    }
    return plane;
  },
};

// 创建我军飞机
export function createMyPlane(_this: Phaser.Scene) {
  // 预警机
  const warningPlaneX = 200;
  const warningPlaneY = window.innerHeight / 2;
  plane
    .create(_this, [warningPlaneX, warningPlaneY], 90, 'demo', 'fly')
    .setDepth(1);
}

// 创建敌军飞机
export function createEnemyPlane(_this: Phaser.Scene) {
  // 创建敌机1
  const foePlane1X = window.innerWidth - 200;
  const foePlane1Y = window.innerHeight / 2 - 100;
  const foe1 = plane
    .create(_this, [foePlane1X, foePlane1Y], 270, 'foePlane-1')
    .setDepth(1);
  // 创建敌机2
  const foePlane2X = window.innerWidth - 200;
  const foePlane2Y = window.innerHeight / 2 + 100;
  const foe2 = plane
    .create(_this, [foePlane2X, foePlane2Y], 270, 'foePlane-2')
    .setDepth(1);
  return [foe1, foe2];
}
