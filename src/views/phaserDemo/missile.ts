// 导弹
export class Missile {
  // 导弹路径
  static createMissilePath(
    startPosition: [number, number], // 起点坐标
    path: number[][] // 运动路径，以终点结尾
  ) {
    const durationPath: Phaser.Math.Vector2[] = [];
    path.forEach((item) => {
      durationPath.push(new Phaser.Math.Vector2(item[0], item[1]));
    });
    const _path = new Phaser.Curves.Path(
      startPosition[0],
      startPosition[1]
    ).splineTo(durationPath);
    return { path: _path, startPosition };
  }
  // 导弹
  static createMissile(
    _this: Phaser.Scene,
    pathObj: any,
    duration: number, // 运行时间
    angle: number // 角度
  ) {
    const _missile = _this.add
      .follower(
        pathObj.path,
        pathObj.startPosition[0],
        pathObj.startPosition[1],
        'missile'
      )
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
