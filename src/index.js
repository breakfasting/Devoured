import * as PIXI from 'pixi.js'

const canvas = document.getElementById('mycanvas')

const app = new PIXI.Application({
  view: canvas,
  width: window.innerWidth,
  height: window.innerHeight,
})

const texture = PIXI.Texture.from('assets/test.png');
const img = new PIXI.Sprite.from(texture);

img.x = app.renderer.width / 2;
img.y = app.renderer.height / 2;

img.anchor.set(0.5);

app.stage.addChild(img);

app.ticker.add(animate);
app.ticker.start();

function animate() {
  img.rotation += 0.1;
  // app.renderer.render(stage)
}

app.loader.add('env', 'assets/tiles.png');
app.loader.load(doneLoading);

function doneLoading(e) {
  createTextureSheet();
  app.ticker.add(animate);
  app.ticker.start();
}

const textureSheet = {};

function createTextureSheet() {
  let sheet = new PIXI.BaseTexture.from(app.loader.resources['env'].url);
  let w = 32;
  let h = 32;
  
  textureSheet['grass'] = new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h))
}