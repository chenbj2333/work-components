function drawLine(_this: Phaser.Scene, start: number[], end: number[]) {
  const graphics = _this.add.graphics();
  const path = new Phaser.Curves.Line([...start, ...end]);
  graphics.lineStyle(1, 0x00ff00, 1);
  path.draw(graphics).setDepth(-1);
  return graphics;
}

export function controlData(
  _this: Phaser.Scene,
  origindata: any,
  commuGraphics: any[]
) {
  const planeArr: any[] = [];
  const planeLine: any[] = [];
  Object.keys(origindata).forEach((key: string) => {
    planeArr.push({
      name: key,
      x: origindata[key].plane.x,
      y: origindata[key].plane.y,
    });
  });
  for (let i = 0; i < planeArr.length; i++) {
    const item = planeArr[i];
    for (let j = i + 1; j < planeArr.length; j++) {
      const target = planeArr[j];
      planeLine.push({
        start: [item.x, item.y],
        end: [target.x, target.y],
      });
    }
  }
  // 如果有连线清除，如果没有则连线
  if (commuGraphics.length > 0) {
    commuGraphics.forEach((item: Phaser.GameObjects.Graphics) => {
      item.destroy();
    });
    commuGraphics.length = 0;
  } else {
    planeLine.forEach((item: any) => {
      commuGraphics.push(drawLine(_this, item.start, item.end));
    });
  }
}
