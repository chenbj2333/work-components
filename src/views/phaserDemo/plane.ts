// 飞机
export const plane = {
  preload: function (
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
  },
  create: function (
    _this: Phaser.Scene,
    position: [number, number],
    angle: number,
    name: string,
    frameName?: string
  ) {
    const plane = _this.add
      .sprite(position[0], position[1], name)
      .setScale(0.5, 0.5);
    plane.rotation = Phaser.Math.DegToRad(angle);
    if (frameName) {
      _this.anims.create({
        key: frameName,
        frames: _this.anims.generateFrameNumbers(name, { start: 1, end: 3 }),
        frameRate: 10,
        repeat: -1,
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
  plane.create(_this, foePlanePos1, 270, 'foePlane-1').setDepth(1);
  // 创建敌机2
  const foePlanePos2: [number, number] = [
    window.innerWidth - 200,
    window.innerHeight / 2 - 100,
  ];
  plane.create(_this, foePlanePos2, 270, 'foePlane-2').setDepth(1);
}
