// CANVAS
var canvas = document.getElementById("onoff");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// COLOR
var bgPrimary = '#fff';
var bgPrimaryReverse = '#000';
var objectColor = '#e5e5e5';
var objectColorReverse = '#333';

// SPPED
px = 8;
py = -8;

// HERO
var hero = {
  x: 50,
  y: 50,
  radius: 20
};

// STAR
var star = {}

// SHAPE
var shapes = [];
var reverseShapes = [];

// LEVEL
var level = 1;
switch (level) {
  case 1:
    hero = {
      x: 50,
      y: 50,
      radius: 20
    };
    shapes = [
      // {
      //   x: 0,
      //   y: canvas.height / 2,
      //   w: canvas.width / 2 * 0.85,
      //   h: canvas.height / 2,
      //   c: objectColorReverse
      // },
      // {
      //   x: canvas.width - (canvas.width / 2 * 0.85),
      //   y: canvas.height / 2,
      //   w: canvas.width / 2 * 0.85,
      //   h: canvas.height / 2,
      //   c: objectColorReverse
      // },
      // {
      //   x: canvas.width/2 + 100,
      //   y: canvas.height / 1.5,
      //   w: 200,
      //   h: canvas.height / 2,
      //   c: objectColorReverse
      // },
      {
        x: canvas.width/2 - 200,
        y: canvas.height / 2 - 100 ,
        w: 200,
        h: 100,
        c: objectColorReverse
      }
    ];
    break;
  default:
    break;
}

// KEY CONTROL
let keysPressed = {};
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function setupKeyboardListeners() {
  document.addEventListener('keydown', function (e) {
    keysPressed[e.key] = true;
  }, false);

  document.addEventListener('keyup', function (e) {
    keysPressed[e.key] = false;
  }, false);
}

function drawCanvas(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawShape(x, y, w, h, c) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = c;
  ctx.fill();
  ctx.closePath();
}

function drawHero() {
  ctx.beginPath();
  ctx.arc(hero.x, hero.y, hero.radius, 0, Math.PI * 2);
  ctx.fillStyle = objectColorReverse;
  ctx.fill();
  ctx.closePath();
}

function drawLevel() {
  drawCanvas(bgPrimary);
  shapes.forEach((shape) => {
    drawShape(shape.x, shape.y, shape.w, shape.h, shape.c);
  });
  // drawShape(0, canvas.height / 2, (canvas.width / 2) * 0.85, canvas.height / 2, objectColorReverse);
  // drawShape(canvas.width - ((canvas.width / 2) * 0.85), canvas.height / 2, (canvas.width / 2) * 0.85, canvas.height / 2, objectColorReverse);
  drawHero();
}

function main() {
  drawLevel();


  shapes.forEach((shape) => {
    if(hero.x - hero.radius > canvas.width - shape.x) {
      console.log("a")
    }
  });

  requestAnimationFrame(main);
}

main();