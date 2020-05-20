import * as PIXI from 'pixi.js';
import * as map from './kitchen.json';

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
    this.tileSize = 16;
    this.map = map.default;
    this.tileTextures = [];
    this.layers = [];
    // console.log(map.default);
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
    for (let i = 0; i < 64 * 126; i += 1) {
      const x = i % 64;
      const y = Math.floor(i / 64);
      this.tileTextures[i] = new PIXI.Texture(
        tileset,
        new PIXI.Rectangle(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize),
      );
    }
    this.img = new PIXI.Sprite(this.tileTextures[333]);
    this.testBuildMap();
  }

  testBuildMap() {
    for (let layer = 0; layer < this.map.layers.length; layer += 1) {
      const oneLayer = new PIXI.Container();
      for (let y = 0; y < this.map.width; y += 1) {
        for (let x = 0; x < this.map.width; x += 1) {
          const tile = this.map.layers[layer].data[y * this.map.width + x];
          if (tile !== 0) {
            const sprite = new PIXI.Sprite(this.tileTextures[tile - 1]);
            sprite.x = x * this.tileSize;
            sprite.y = y * this.tileSize;
            oneLayer.addChild(sprite);
          }
        }
      }
      oneLayer.scale.set(2);
      this.layers.push(oneLayer);
    }
    this.start();
  }

  start() {
    this.img.scale.set(2);
    this.img.x = this.app.renderer.width / 2;
    this.img.y = this.app.renderer.height / 2;
    this.img.anchor.set(0.5);
    for (let layer of this.layers) {
      this.app.stage.addChild(layer);
    }

    this.app.ticker.add(() => {
      this.img.rotation += 0.01;
    });
    this.app.ticker.start();
  }
}

export default Game;
