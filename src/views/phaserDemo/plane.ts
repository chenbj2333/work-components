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
  const warningPlanePos: [number, number] = [200, window.innerHeight / 2];
  plane.create(_this, warningPlanePos, 90, 'demo', 'fly').setDepth(1);
}

// 创建敌军飞机
export function createEnemyPlane(_this: Phaser.Scene) {
  // 创建敌机1
  const foePlanePos1: [number, number] = [
    window.innerWidth - 200,
    window.innerHeight / 2 + 100,
  ];
  const foe1 = plane.create(_this, foePlanePos1, 270, 'foePlane-1').setDepth(1);
  // 创建敌机2
  const foePlanePos2: [number, number] = [
    window.innerWidth - 200,
    window.innerHeight / 2 - 100,
  ];
  const foe2 = plane.create(_this, foePlanePos2, 270, 'foePlane-2').setDepth(1);

  return [foe1, foe2];
}
