import * as PIXI from 'pixi.js';

class Player {
  constructor() {
    this.loader = PIXI.Loader.shared;
    this.playerFrames = [];
    this.actions = {};
    this.facing = 'south';

    this.keys = {};
    this.keysDown = this.keysDown.bind(this);
    this.keysUp = this.keysUp.bind(this);
    this.playerLoop = this.playerLoop.bind(this);

    this.vx = 0;
    this.vy = 0;

    this.createPlayer();
    this.buildActions();
    this.actionPlayer();

    window.addEventListener('keydown', this.keysDown);
    window.addEventListener('keyup', this.keysUp);
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
    this.player.scale.set(2);
    this.player.anchor.set(0.5);
    this.player.animationSpeed = 0.3;
    this.player.loop = false;
  }

  keysDown(e) {
    this.keys[e.keyCode] = true;
  }

  keysUp(e) {
    this.keys[e.keyCode] = false;
  }

  playerLoop() {
    this.player.y += this.vy;
    this.player.x += this.vx;
    // W
    if (this.keys['87']) {
      if (!this.player.playing) {
        this.player.textures = this.actions.walkNorth;
        this.facing = 'north';
        this.player.play();
      }
      this.vy = Math.max(-6, this.vy - 2);
    }

    // S
    if (this.keys['83']) {
      if (!this.player.playing) {
        this.player.textures = this.actions.walkSouth;
        this.facing = 'south';
        this.player.play();
      }
      this.vy = Math.min(6, this.vy + 2);
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
      this.vx = Math.max(-6, this.vx - 2);
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
      this.vx = Math.min(6, this.vx + 2);
    }

    if (this.vx > 0) {
      this.vx -= 0.5;
    }

    if (this.vx < 0) {
      this.vx += 0.5;
    }

    if (this.vy > 0) {
      this.vy -= 0.5;
    }

    if (this.vy < 0) {
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
  }
}

export default Player;
