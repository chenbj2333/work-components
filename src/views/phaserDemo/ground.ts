// 背景
export const ground = {
  create: function (_this: Phaser.Scene) {
    // this.add.image(0, 0, 'bg1').setOrigin(0, 0).setScale(5, 5);
    return _this.add
      .tileSprite(0, 0, window.innerWidth, window.innerHeight, 'bg')
      .setOrigin(0);
  },
};
