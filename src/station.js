import * as PIXI from 'pixi.js';
import Item from './item';

class Station extends PIXI.Container {
  constructor(name) {
    super();
    this.name = name;
    this.active = false;
  }

  createItem() {
    return Item.createItem('lettuce', 100, 100);
  }

  activate() {
    this.active = true;
    // console.log(this);
    this.children.forEach((sprite) => {
      sprite.tint = 0xFF0000;
    });
    return this;
  }

  deactivate() {
    this.active = false;

    this.children.forEach((sprite) => {
      sprite.tint = 0xFFFFFF;
    });
  }

  inRange(player) {
    const aBox = player.getBounds();
    const bBox = this.getBounds();

    return aBox.x + aBox.width - 12 > bBox.x
      && aBox.x < bBox.x + bBox.width - 12
      && aBox.y + aBox.height - 12 > bBox.y
      && aBox.y < bBox.y + bBox.height - 40;
  }

  collision(player) {
    const aBox = player.getBounds();
    const bBox = this.getBounds();

    const collide = aBox.x + aBox.width - 16 > bBox.x
      && aBox.x < bBox.x + bBox.width - 16
      && aBox.y + aBox.height - 16 > bBox.y
      && aBox.y < bBox.y + bBox.height - 44;

    return collide;
  }
}

export default Station;
