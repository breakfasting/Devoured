import * as PIXI from 'pixi.js';

class Player {
  constructor(layers, group, mapItems) {
    this.loader = PIXI.Loader.shared;
    this.playerFrames = [];
    this.actions = {};
    this.facing = 'south';
    this.layers = layers;
    this.group = group;
    this.boxes = [...layers];
    this.mapItems = mapItems;
    this.active = null;

    this.keys = {};
    this.keysDown = this.keysDown.bind(this);
    this.keysUp = this.keysUp.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.contextMenu = this.contextMenu.bind(this);
    this.playerLoop = this.playerLoop.bind(this);

    this.vx = 0;
    this.vy = 0;

    this.heldItem = { type: null, parent: {} };
    this.hoverItem = null;

    this.createPlayer();
    this.buildActions();
    this.actionPlayer();

    window.addEventListener('keydown', this.keysDown);
    window.addEventListener('keyup', this.keysUp);
    window.addEventListener('mousedown', this.mouseDown);
    window.addEventListener('contextmenu', this.contextMenu);
  }

  createPlayer() {
    const tileset = this.loader.resources.player.texture;
    for (let i = 0; i < 15; i += 1) {
      this.playerFrames[i] = new PIXI.Texture(
        tileset,
        new PIXI.Rectangle(i * 25, 15, 25, 31),
      );
    }
  }

  buildActions() {
    this.actions.standSouth = [this.playerFrames[0]];
    this.actions.standEast = [this.playerFrames[1]];
    this.actions.standNorth = [this.playerFrames[2]];
    this.actions.walkSouth = [
      this.playerFrames[3],
      this.playerFrames[4],
      this.playerFrames[5],
      this.playerFrames[6],
    ];
    this.actions.walkEast = [
      this.playerFrames[7],
      this.playerFrames[8],
      this.playerFrames[9],
      this.playerFrames[10],
    ];
    this.actions.walkNorth = [
      this.playerFrames[11],
      this.playerFrames[12],
      this.playerFrames[13],
      this.playerFrames[14],
    ];
  }

  actionPlayer() {
    this.player = new PIXI.AnimatedSprite(this.actions.standSouth);
    this.player.parentGroup = this.group;
    this.player.scale.set(2);
    // this.player.anchor.set(0.5);
    this.player.anchor.x = 0.5;
    this.player.anchor.y = 0.5;
    this.player.animationSpeed = 0.3;
    this.player.loop = false;
  }

  keysDown(e) {
    this.keys[e.keyCode] = true;
  }

  keysUp(e) {
    this.keys[e.keyCode] = false;
  }

  mouseDown(e) {
    if (!this.heldItem.type && e.button === 0) {
      if (this.active) {
        this.heldItem = this.active.createItem(this.player.x, this.player.y + 10, this.group);
        this.mapItems.addChild(this.heldItem);
      }
    }
  }

  contextMenu(e) {
    e.preventDefault();
    this.heldItem = { type: null, parent: {} };
  }

  playerLoop() {
    this.player.y += this.vy;
    this.player.x += this.vx;

    // this.heldItem.x = this.player.x;
    this.heldItem.y = this.player.y + 7;
    // this.player.zOrder -= 10;
    this.boxes.forEach((box) => {
      if (box.collision(this.player)) {
        // console.log(box)
        this.player.y -= this.vy;
        this.player.x -= this.vx;
        this.vy = 0;
        this.vx = 0;
        this.active = this.active ? this.active : box.activate();
      }
    });

    this.mapItems.children.forEach((item) => {
      if (item.collision(this.player)) {
        this.hoverItem = this.hoverItem ? this.hoverItem : item.activate();
      }
    });

    if (this.active && !this.active.inRange(this.player)) {
      this.active = this.active.deactivate();
    }

    // console.log(this.hoverItem);
    if (this.hoverItem && !this.hoverItem.collision(this.player)) {
      this.hoverItem = this.hoverItem.deactivate();
    }

    // console.log(this.player.y);

    const maxSpeed = 6;
    // W
    if (this.keys['87']) {
      if (!this.player.playing) {
        this.player.textures = this.actions.walkNorth;
        this.facing = 'north';
        this.player.play();
      }
      this.vy = Math.max(-maxSpeed, this.vy - 1);
    }

    // S
    if (this.keys['83']) {
      if (!this.player.playing) {
        this.player.textures = this.actions.walkSouth;
        this.facing = 'south';
        this.player.play();
      }
      this.vy = Math.min(maxSpeed, this.vy + 1);
    }

    // A
    if (this.keys['65']) {
      if (this.player.scale.x > 0) {
        this.player.scale.x *= -1;
      }
      if (!this.player.playing) {
        this.player.textures = this.actions.walkEast;
        this.facing = 'side';
        this.player.play();
      }

      this.vx = Math.max(-maxSpeed, this.vx - 1);
    }

    // D
    if (this.keys['68']) {
      if (this.player.scale.x < 0) {
        this.player.scale.x *= -1;
      }
      if (!this.player.playing) {
        this.player.textures = this.actions.walkEast;
        this.facing = 'side';
        this.player.play();
      }
      this.vx = Math.min(maxSpeed, this.vx + 1);
    }

    if (this.vx > 0) {
      this.heldItem.x = this.player.x + 16;
      // this.heldItem.parent.zIndex = 4;
      this.vx -= 0.5;
    }

    if (this.vx < 0) {
      this.heldItem.x = this.player.x - 16;
      // this.heldItem.parent.zIndex = 4;
      this.vx += 0.5;
    }

    if (this.vy > 0) {
      this.heldItem.x = this.player.x;
      // this.heldItem.parent.zIndex = 4;
      this.vy -= 0.5;
    }

    if (this.vy < 0) {
      this.heldItem.x = this.player.x;
      // this.heldItem.parent.zIndex = 1;
      this.vy += 0.5;
    }

    // IDLE
    if (!(this.keys['87'] || this.keys['83'] || this.keys['65'] || this.keys['68'])) {
      switch (this.facing) {
        case 'south':
          this.player.textures = this.actions.standSouth;
          break;
        case 'north':
          this.player.textures = this.actions.standNorth;
          break;
        case 'side':
          this.player.textures = this.actions.standEast;
          break;
        default:
          break;
      }
    }

    // COLLISION
  }
}

export default Player;
