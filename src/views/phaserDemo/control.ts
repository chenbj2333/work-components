export class ControlEvent {
  obj: any;
  _this: Phaser.Scene;
  constructor(
    _this: Phaser.Scene,
    btnText: string,
    position: [number, number],
    color: string,
    fontSize: string,
    zIndex: number
  ) {
    this._this = _this;
    this.obj = _this.add
      .text(position[0], position[1], btnText, {
        color,
        fontSize,
      })
      .setDepth(zIndex)
      .setInteractive();
  }

  onEvent(eventName: string, callback: any) {
    this.obj.on(eventName, callback);
  }
}
