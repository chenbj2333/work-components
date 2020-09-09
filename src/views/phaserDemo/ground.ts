// 背景
export const ground = {
  preload: function (_this: Phaser.Scene) {
    _this.load.image('bg', '/images/bg.png');
  },
  create: function (_this: Phaser.Scene) {
    return _this.add
      .tileSprite(0, 0, window.innerWidth, window.innerHeight, 'bg')
      .setOrigin(0);
  },
};
