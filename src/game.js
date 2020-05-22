import * as PIXI from 'pixi.js';
import 'pixi-layers';
import Map from './map';
import Player from './player';
import Item from './item';
import * as map from './simple.json';

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

    this.mapItems = new PIXI.Container();
    this.mapItems.zIndex = 4;

    this.gameLoop = this.gameLoop.bind(this);
  }

  load() {
    this.loader.add('player', 'assets/player.png');
    this.loader.add('corn', 'assets/food/Corn.png');
    this.loader.add('apple', 'assets/food/AppleRed.png');
    this.loader.add('potato', 'assets/food/Potato.png');
    this.loader.add('tileset', 'assets/tiles.png')
      .on('progress', (loader) => {
        console.log(`${loader.progress}% loaded`);
      })
      .load(() => {
        this.greenGroup = new PIXI.display.Group(1, ((sprite) => {
          sprite.zOrder = sprite.y;
        }));
        this.map = new Map(map.default, this.greenGroup);
        this.player = new Player(this.map.layers, this.greenGroup, this.mapItems);
        this.start();
      });
  }

  gameLoop() {
    this.keysHUD.innerHTML = JSON.stringify(this.player.keys);
    document.getElementById('activeHUD').innerHTML = this.player.active ? this.player.active.name : 'no' ;
  }

  start() {
    this.app.stage = new PIXI.display.Stage();
    this.app.stage.sortableChildren = true;
    this.app.stage.addChild(new PIXI.display.Layer(this.greenGroup));

    this.player.player.x = this.app.renderer.width / 2;
    this.player.player.y = this.app.renderer.height / 2;
    this.app.stage.addChild(this.player.player);
    // console.log(this.map.layers);
    this.map.layers.forEach((layer) => {
      this.app.stage.addChild(layer);
    });
    // console.log(this.mapItems)
    this.app.stage.addChild(this.mapItems);

    this.app.ticker.add(() => {
      this.mapItems.children.forEach(item => item.fly());
    });
    this.app.ticker.add(this.gameLoop);
    this.app.ticker.add(this.player.playerLoop);
    this.app.ticker.start();
  }
}

export default Game;
