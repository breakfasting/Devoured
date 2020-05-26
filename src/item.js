import * as PIXI from 'pixi.js';

class Item extends PIXI.Sprite {
  constructor(texture, type) {
    super(texture);
    this.type = type;
    this.fly = this.fly.bind(this);
    this.vx = 0;
    this.vy = 0;
    this.flying = false;
    this.value = 0;
  }

  static createItem(itemName, x, y, group) {
    const loader = PIXI.Loader.shared;
    const tileset = loader.resources[itemName].texture;
    const texture = new PIXI.Texture(
      tileset,
      new PIXI.Rectangle(4, 4, 24, 24),
    );
    const item = new Item(texture, itemName);
    // item.hitArea = new PIXI.Rectangle(4, 4, 24, 24)
    item.x = x;
    item.y = y;
    item.parentGroup = group;
    item.anchor.set(0.5);
    return item;
  }

  fly(stations) {
    if (this.flying) {
      this.x += this.vx;
      this.y += this.vy;

      if (Math.abs(this.vx) < 8 && Math.abs(this.vy) < 8) {
        stations.forEach((station) => {
          if (this.collision(station)) {
            // console.log(station);
            // console.log(this);
            this.y -= this.vy;
            this.x -= this.vx;
            this.vy = -this.vy / 2;
            this.vx = -this.vx / 2;
          }
        });
      }

      if (this.vx > 0) {
        this.vx = this.vx - 0.2 < 0 ? 0 : this.vx - 0.2;
      }

      if (this.vx < 0) {
        this.vx = this.vx + 0.2 > 0 ? 0 : this.vx + 0.2;
      }

      if (this.vy > 0) {
        this.vy = this.vy - 0.2 < 0 ? 0 : this.vy - 0.2;
      }

      if (this.vy < 0) {
        this.vy = this.vy + 0.2 > 0 ? 0 : this.vy + 0.2;
      }

      if (this.vx !== 0 || this.vy !== 0) {
        this.rotation += 0.1;
      }
    }
  }

  float() {
    this.value += 0.1;
    this.y += Math.sin(this.value) / 4;
  }

  activate() {
    this.tint = 0xFF0000;
    return this;
  }

  deactivate() {
    this.tint = 0xFFFFFF;
    return null;
  }

  collision(stuff) {
    const aBox = stuff.getBounds();
    const bBox = this.getBounds();

    const collide = aBox.x + aBox.width > bBox.x
      && aBox.x < bBox.x + bBox.width
      && aBox.y + aBox.height > bBox.y
      && aBox.y < bBox.y + bBox.height;

    return collide;
  }
}

export default Item;
