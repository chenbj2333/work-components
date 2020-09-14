export class LoadObject {
  loadGround(_this: Phaser.Scene) {
    _this.load.image('bg', '/images/bg.png');
  }
  loadSprite(_this: Phaser.Scene, width: number, height: number, name: string) {
    const imageName = name.split('-')[0];
    return _this.load.spritesheet(name, `/images/${imageName}.png`, {
      frameWidth: width,
      frameHeight: height,
    });
  }
}

export function loadObj(_this: Phaser.Scene) {
  const lo = new LoadObject();
  lo.loadGround(_this);
  lo.loadSprite(_this, 195, 195, 'demo');
  lo.loadSprite(_this, 195, 195, 'foePlane-1');
  lo.loadSprite(_this, 195, 195, 'foePlane-2');
  lo.loadSprite(_this, 123, 160, 'explose');
  lo.loadSprite(_this, 29, 72, 'missile-1');
}
