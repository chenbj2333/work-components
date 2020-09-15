// 导弹
export class Missile {
  // 导弹路径

  static createMissile(
    _this: Phaser.Scene,
    startPosition: [number, number], // 起点坐标
    path: number[][], // 运动路径，以终点结尾
    duration: number, // 运行时间
    angle: number // 角度
  ) {
    const durationPath: Phaser.Math.Vector2[] = [];
    path.forEach((item) => {
      durationPath.push(new Phaser.Math.Vector2(item[0], item[1]));
    });
    const _path = new Phaser.Curves.Path(
      startPosition[0],
      startPosition[1]
    ).splineTo(durationPath);
    // const graphics = _this.add.graphics();
    // graphics.lineStyle(1, 0xffffff, 1);
    // _path.draw(graphics, 128);
    // graphics.fillStyle(0x00ff00, 1);
    const _missile = _this.add
      .follower(_path, 200, window.innerHeight / 2, 'missile-1')
      .setScale(0.4)
      .setDepth(-1);
    _this.physics.add.existing(_missile);
    _missile.startFollow({
      duration,
      rotateToPath: true,
      rotationOffset: angle,
      ease: 'Sine.easeIn',
    });

    return _missile;
  }
}
