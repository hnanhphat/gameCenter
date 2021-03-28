// CANVAS
var canvas = document.getElementById("onoff");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.6;
canvas.height = window.innerHeight * 0.6;

// COLOR
var bgPrimary = '#fff';
var bgPrimaryReverse = '#000';
var objectColor = '#e5e5e5';
var objectColorReverse = '#333';
var canvasBg = bgPrimary;

// SPPED
var speed = 5;
var speedxl = 5;
var speedxr = 5;
var speedyt = 5;
var speedyb = 5;

// HERO
var hero = {
  x: 50,
  y: canvas.height / 2,
  radius: 20,
  s: 0,
  c: objectColorReverse
};

// STAR
var star = {
  x: canvas.width - 80,
  y: canvas.height / 2,
  c: objectColorReverse
}

// SHAPE
var shapes = [{
  x: canvas.width / 2 - 10,
  y: 0,
  w: 20,
  h: canvas.height,
  c: objectColorReverse,
  s: 0
}, {
  x: canvas.width / 2 - 160,
  y: 0,
  w: 20,
  h: canvas.height,
  c: objectColor,
  s: 1
}, {
  x: canvas.width / 2 - 310,
  y: 0,
  w: 20,
  h: canvas.height,
  c: objectColorReverse,
  s: 0
}, {
  x: canvas.width / 2 + 140,
  y: 0,
  w: 20,
  h: canvas.height,
  c: objectColor,
  s: 1
}, {
  x: canvas.width / 2 + 290,
  y: 0,
  w: 20,
  h: canvas.height,
  c: objectColorReverse,
  s: 0
}];

// SCORE
score = 0;
highScore = 0;
death = 0;
timing = 5;
showLevel = document.getElementById('level');
showScore = document.getElementById('score');
showHighCore = document.getElementById('highScore');
showDeath = document.getElementById('death');
showTime = document.getElementById('time');

// LEVEL
var level = 1;

// KEY CONTROL
let keysPressed = {};

function keyListeners() {
  document.addEventListener('keydown', function (e) {
    keysPressed[e.key] = true;
    if (e.code == 'Space') {
      if (hero.s == 1) {
        canvasBg = bgPrimary;
        hero.s = 0;
        hero.c = objectColorReverse;
        star.c = objectColorReverse;
      } else if (hero.s == 0) {
        canvasBg = bgPrimaryReverse;
        hero.s = 1;
        hero.c = objectColor;
        star.c = objectColor;
      }
    }
  }, false);

  document.addEventListener('keyup', function (e) {
    keysPressed[e.key] = false;
  }, false);
}

function keysPressing() {
  if (keysPressed['ArrowUp']) {
    hero.y -= speedyt;
    if (hero.y - hero.radius < 0) {
      hero.y = hero.radius;
    }
    shapes.forEach((shape) => {
      if (hero.s == shape.s) {
        if (hero.x + hero.radius > shape.x && hero.x - hero.radius < shape.x + shape.w && hero.y + hero.radius > shape.y && hero.y - hero.radius < shape.y + shape.h) {
          hero.y = shape.y + shape.h + hero.radius;
        }
      }
    });
  }
  if (keysPressed['ArrowDown']) {
    hero.y += speedyb;
    if (hero.y + hero.radius > canvas.height) {
      hero.y = canvas.height - hero.radius;
    }
    shapes.forEach((shape) => {
      if (hero.s == shape.s) {
        if (hero.x + hero.radius > shape.x && hero.x - hero.radius < shape.x + shape.w && hero.y + hero.radius > shape.y && hero.y - hero.radius < shape.y + shape.h) {
          hero.y = shape.y - hero.radius;
        }
      }
    });
  }
  if (keysPressed['ArrowLeft']) {
    hero.x -= speedxl;
    if (hero.x - hero.radius < 0) {
      hero.x = hero.radius;
    }
    shapes.forEach((shape) => {
      if (hero.s == shape.s) {
        if (hero.x + hero.radius > shape.x && hero.x - hero.radius < shape.x + shape.w && hero.y + hero.radius > shape.y && hero.y - hero.radius < shape.y + shape.h) {
          hero.x = shape.x + shape.w + hero.radius;
        }
      }
    });
  }
  if (keysPressed['ArrowRight']) {
    hero.x += speedxr;
    if (hero.x + hero.radius > canvas.width) {
      hero.x = canvas.width - hero.radius;
    }
    shapes.forEach((shape) => {
      if (hero.s == shape.s) {
        if (hero.x + hero.radius > shape.x && hero.x - hero.radius < shape.x + shape.w && hero.y + hero.radius > shape.y && hero.y - hero.radius < shape.y + shape.h) {
          hero.x = shape.x - hero.radius;
        }
      }
    });
  }
}

// DRAW CANVAS
function drawCanvas(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// DRAW SHAPE
function drawShape(x, y, w, h, c) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = c;
  ctx.fill();
  ctx.closePath();
}

// DRAW HERO
function drawHero() {
  ctx.beginPath();
  ctx.arc(hero.x, hero.y, hero.radius, 0, Math.PI * 2);
  ctx.fillStyle = hero.c;
  ctx.fill();
  ctx.closePath();
}

// DRAW STAR
function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius)
  for (i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y)
    rot += step
    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y)
    rot += step
  }
  ctx.lineTo(cx, cy - outerRadius)
  ctx.closePath();
  ctx.lineWidth = 5;
  ctx.fillStyle = star.c;
  ctx.fill();
}

function updateObject() {
  // console.log(star.x, hero.x)
  if (hero.x + hero.radius >= star.x - 25 && hero.x - hero.radius <= star.x + 25 && hero.y + hero.radius >= star.y - 25 && hero.y - hero.radius <= star.y + 25) {
    star.x = 50;
    star.y = 50;
    score++;
    level++;
  }

  showLevel.innerHTML = `Level: ${level}`;
  showScore.innerHTML = `Score: ${score}`;
  showHighCore.innerHTML = `HighCore: ${highScore}`;
  showDeath.innerHTML = `Death: ${death}`;
  showTime.innerHTML = `Timing: ${timing - Math.floor((Date.now() - Date.now()) / 1000)}`;
}

// ALL
function draw() {
  keysPressing();
  updateObject();
  drawCanvas(canvasBg);
  shapes.forEach((shape) => {
    drawShape(shape.x, shape.y, shape.w, shape.h, shape.c);
  });
  drawHero();
  drawStar(star.x, star.y, 5, 25, 15);
}

function main() {
  draw();
  requestAnimationFrame(main);
}

// keyListeners();
// main();

function createInfo() {
  nameUser = document.getElementById('nameUser');
  gameStarting = true;
  nameInputed = false
  document.getElementById('username').addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
      if (this.value) {
        nameUser.innerHTML = `Hello, ${this.value}`;
      } else {
        this.value = 'Anonymous'
        nameUser.innerHTML = `Hello, ${this.value}`;
      }
      this.value = '';
      nameInputed = true;
    }
  });

  btnStart = document.getElementById('start');
  if (btnStart) {
    btnStart.addEventListener('click', function () {
      if (gameStarting && nameInputed) {
        keyListeners();
        main();
        gameStarting = false;
      }
      // else {
      //   alert('Please input your name!')
      // }
    });
  }

  btnRestart = document.getElementById('restart');
  if (btnRestart) {

  }
}
createInfo();