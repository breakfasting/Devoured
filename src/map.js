import * as PIXI from 'pixi.js';
import Station from './station';

class Map {
  constructor(mapFile, group) {
    this.map = mapFile;
    this.tileSize = 16;
    this.tileTextures = [];
    this.layers = [];
    this.group = group;

    this.loader = PIXI.Loader.shared;
    this.buildTile();
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
    this.testBuildMap();
  }

  testBuildMap() {
    for (let layer = 0; layer < this.map.layers.length; layer += 1) {
      const oneLayer = new Station(this.map.layers[layer].name);
      for (let y = 0; y < this.map.height; y += 1) {
        for (let x = 0; x < this.map.width; x += 1) {
          const tile = this.map.layers[layer].data[y * this.map.width + x];
          if (tile !== 0) {
            const sprite = new PIXI.Sprite(this.tileTextures[tile - 1]);
            sprite.x = x * this.tileSize * 1.5;
            sprite.y = y * this.tileSize * 1.5;
            sprite.scale.set(1.5);
            if (this.map.layers[layer].name !== 'ground') {
              sprite.parentGroup = this.group;
            }
            oneLayer.addChild(sprite);
          }
        }
      }
      // console.log(oneLayer)
      // oneLayer.scale.set(2);
      // this.layers[this.map.layers[layer].name] = oneLayer;
      if (this.map.layers[layer].name !== 'ground') {
        this.layers.push(oneLayer);
      } else {
        this.ground = oneLayer;
      }
    }
  }
}

export default Map;
