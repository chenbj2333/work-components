// 飞机
export const plane = {
  create: function (
    _this: Phaser.Scene,
    position: [number, number],
    angle: number,
    name: string,
    scale?: number,
    frameName?: string
  ) {
    const scaleValue = scale || 0.5;
    const plane = _this.physics.add
      .sprite(position[0], position[1], name)
      .setScale(scaleValue);
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
  const height = window.innerHeight / 2;
  return {
    warning: {
      plane: plane.create(_this, [150, height], 90, 'demo', 0.5, 'fly'),
      drone: [
        plane.create(_this, [400, height - 100], 90, 'drone', 0.3),
        plane.create(_this, [450, height], 90, 'drone', 0.3),
        plane.create(_this, [400, height + 100], 90, 'drone', 0.3),
      ],
    },
    j201: {
      plane: plane.create(_this, [300, height - 250], 90, 'J20', 0.4),
      drone: [
        plane.create(_this, [600, height - 350], 90, 'drone', 0.3),
        plane.create(_this, [500, height - 250], 90, 'drone', 0.3),
        plane.create(_this, [600, height - 150], 90, 'drone', 0.3),
      ],
    },
    j202: {
      plane: plane.create(_this, [300, height + 250], 90, 'J20', 0.4),
      drone: [
        plane.create(_this, [600, height + 350], 90, 'drone', 0.3),
        plane.create(_this, [500, height + 250], 90, 'drone', 0.3),
        plane.create(_this, [600, height + 150], 90, 'drone', 0.3),
      ],
    },
  };
}

// 创建敌军飞机
export function createEnemyPlane(_this: Phaser.Scene) {
  const width = window.innerWidth;
  const height = window.innerHeight / 2;
  return {
    foe1: plane.create(_this, [width - 200, height - 100], 270, 'foePlane'),
    foe2: plane.create(_this, [width - 200, height + 100], 270, 'foePlane'),
  };
}
