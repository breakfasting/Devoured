import * as PIXI from 'pixi.js';

class Game {
  constructor() {
    const canvas = document.getElementById('mycanvas');

    this.app = new PIXI.Application({
      view: canvas,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.loader = PIXI.Loader.shared;
    this.buildTile = this.buildTile.bind(this);
    this.tileSize = 32;
    this.map = {
      width: 4,
      height: 4,
      tiles: [],
    }
  }

  load() {
    this.loader.add('tileset', 'assets/tiles.png')
      .on('progress', (loader) => {
        console.log(`${loader.progress}% loaded`);
      })
      .load(this.buildTile);
  }

  buildTile() {
    const tileset = this.loader.resources.tileset.texture;
    const tileTextures = [];
    for (let i = 0; i < 32 * 63; i += 1) {
      const x = i % 32;
      const y = Math.floor(i / 32);
      tileTextures[i] = new PIXI.Texture(
        tileset,
        new PIXI.Rectangle(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize),
      );
    }
    this.img = new PIXI.Sprite(tileTextures[355]);
    this.start();
  }

  start() {
    this.img.scale.set(2);
    this.img.x = this.app.renderer.width / 2;
    this.img.y = this.app.renderer.height / 2;
    this.img.anchor.set(0.5);
    this.app.stage.addChild(this.img);

    this.app.ticker.add(() => {
      this.img.rotation += 0.01;
    });
    this.app.ticker.start();
  }
}

export default Game;
