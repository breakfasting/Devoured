import * as PIXI from 'pixi.js';

class Game {
  constructor() {
    const canvas = document.getElementById('mycanvas');

    this.app = new PIXI.Application({
      view: canvas,
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  start() {
    const texture = PIXI.Texture.from('assets/test.png');
    const img = new PIXI.Sprite(texture);

    img.x = this.app.renderer.width / 2;
    img.y = this.app.renderer.height / 2;
    img.anchor.set(0.5);

    this.app.stage.addChild(img);

    this.app.ticker.add(() => {
      img.rotation += 0.1;
    });
    this.app.ticker.start();
  }
}

export default Game;
