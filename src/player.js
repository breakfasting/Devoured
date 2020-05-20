import * as PIXI from 'pixi.js';

class Player {
  constructor() {
    this.loader = PIXI.Loader.shared;
    this.playerFrames = [];
    this.actions = {};

    this.keys = {};
    this.keysDown = this.keysDown.bind(this);
    this.keysUp = this.keysUp.bind(this);
    this.playerLoop = this.playerLoop.bind(this);

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
    this.player = new PIXI.AnimatedSprite(this.actions.walkSouth);
    this.player.scale.set(2);
    this.player.anchor.set(0.5);
    this.player.animationSpeed = 0.2;
    this.player.play();
  }

  keysDown(e) {
    this.keys[e.keyCode] = true;
  }

  keysUp(e) {
    this.keys[e.keyCode] = false;
  }

  playerLoop() {
    // W
    if (this.keys['87']) {
      this.player.y -= 5;
    }

    // A
    if (this.keys['65']) {
      this.player.x -= 5;
    }

    // S
    if (this.keys['83']) {
      this.player.y += 5;
    }

    // D
    if (this.keys['68']) {
      this.player.x += 5;
    }
  }
}

export default Player;
