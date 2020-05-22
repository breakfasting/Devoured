import * as PIXI from 'pixi.js';

class Item extends PIXI.Sprite {
  constructor(texture, type) {
    super(texture);
    this.type = type;
  }

  static createItem(itemName, x, y, group) {
    const loader = PIXI.Loader.shared;
    const tileset = loader.resources[itemName].texture;
    const item = new Item(tileset, itemName);
    item.x = x;
    item.y = y;
    item.parentGroup = group;
    item.anchor.set(0.5);
    return item;
  }

  activate() {
    this.tint = 0xFF0000;
    return this
  }

  deactivate() {
    this.tint = 0xFFFFFF;
    return null;
  }

  collision(player) {
    const aBox = player.getBounds();
    const bBox = this.getBounds();

    const collide = aBox.x + aBox.width > bBox.x
      && aBox.x < bBox.x + bBox.width
      && aBox.y + aBox.height > bBox.y
      && aBox.y < bBox.y + bBox.height;

    return collide;
  }
}

export default Item;
