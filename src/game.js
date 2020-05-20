import * as PIXI from 'pixi.js';
import Map from './map';
import Player from './player';
import * as map from './kitchen.json';

class Game {
  constructor() {
    const canvas = document.getElementById('mycanvas');
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    this.app = new PIXI.Application({
      view: canvas,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.loader = PIXI.Loader.shared;
    this.keysHUD = document.getElementById('keysHUD');
    this.tileSize = 16;

    this.gameLoop = this.gameLoop.bind(this);
  }

  load() {
    this.loader.add('player', 'assets/player.png');
    this.loader.add('tileset', 'assets/tiles.png')
      .on('progress', (loader) => {
        console.log(`${loader.progress}% loaded`);
      })
      .load(() => {
        this.map = new Map(map.default);
        this.player = new Player();
        this.start();
      });
  }

  gameLoop() {
    this.keysHUD.innerHTML = JSON.stringify(this.player.keys);
  }

  start() {
    // const player = new PIXI.Sprite(this.player.playerFrames[4]);
    // player.scale.set(2);
    this.player.player.x = this.app.renderer.width / 2;
    this.player.player.y = this.app.renderer.height / 2;

    this.map.layers.forEach((layer) => {
      this.app.stage.addChild(layer);
    });
    this.app.stage.addChild(this.player.player);
    // this.app.ticker.add(() => {
    //   layer.rotation += 0.01;
    // });
    this.app.ticker.add(this.gameLoop);
    this.app.ticker.add(this.player.playerLoop);
    this.app.ticker.start();
  }
}

export default Game;
