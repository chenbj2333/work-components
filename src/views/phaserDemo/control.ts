export class ControlEvent {
  obj: any;
  _this: Phaser.Scene;
  constructor(_this: Phaser.Scene, btnText: string, positionX: number) {
    this._this = _this;
    const positionY = window.innerHeight - 72;
    // const text2Color: { [name: string]: string } = {
    //   火力网: '#f00',
    //   通信网: '#00ff5a',
    //   干扰网: '#ff912f',
    //   探测网: '#02c6ff',
    // };
    // this.obj = _this.add
    //   .text(positionX, positionY, btnText, {
    //     color: '#fff',
    //     fontSize: '14px',
    //     backgroundColor: text2Color[btnText],
    //     fontFamily: 'Open Sans',
    //   })
    //   .setPadding(16, 8, 16, 8)
    //   .setDepth(1)
    //   .setInteractive();
    this.obj = _this.add
      .sprite(positionX, positionY, btnText, 1)
      .setInteractive();
  }

  onEvent(eventName: string, callback: any) {
    this.obj.on(eventName, callback);
  }

  setObjFrame(frame: number) {
    this.obj.setFrame(frame);
  }
}
