// 我军飞机
export const plane = {
  preload: function (
    _this: Phaser.Scene,
    width: number,
    height: number,
    name: string
  ) {
    const imageName = name.split('-')[0];
    _this.load.spritesheet(name, `/images/${imageName}.png`, {
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
  },
};
