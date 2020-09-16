export class LoadObject {
  loadGround(_this: Phaser.Scene) {
    _this.load.image('bg', '/images/bg.png');
  }
  loadSprite(_this: Phaser.Scene, width: number, height: number, name: string) {
    return _this.load.spritesheet(name, `/images/${name}.png`, {
      frameWidth: width,
      frameHeight: height,
    });
  }
}

export function loadObj(_this: Phaser.Scene) {
  const lo = new LoadObject();
  lo.loadGround(_this);
  lo.loadSprite(_this, 195, 195, 'demo');
  lo.loadSprite(_this, 146, 209, 'J20');
  lo.loadSprite(_this, 146, 209, 'drone');
  lo.loadSprite(_this, 195, 195, 'foePlane');
  lo.loadSprite(_this, 123, 160, 'explose');
  lo.loadSprite(_this, 29, 72, 'missile');
  // 按钮
  lo.loadSprite(_this, 74, 32, 'fire');
  lo.loadSprite(_this, 74, 32, 'commu');
  lo.loadSprite(_this, 74, 32, 'interf');
  lo.loadSprite(_this, 74, 32, 'probe');
  // 箭头
  lo.loadSprite(_this, 66, 65, 'arrow');
  lo.loadSprite(_this, 4, 4, 'circle');
}
