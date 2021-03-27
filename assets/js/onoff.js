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

// LEVEL
var level = 1;

// HERO
var hero = {
  x: 50,
  y: 50
};

// SHAPE
var shapes = [];
var reverseShapes = [];

// KEY CONTROL
var upPressed = false;
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  }
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

function drawHeroPosition() {
  ctx.beginPath();
  ctx.arc(hero.x, hero.y, 20, 0, Math.PI * 2);
  ctx.fillStyle = objectColorReverse;
  ctx.fill();
  ctx.closePath();
}

function drawLevel() {
  switch (level) {
    case 1:
      drawCanvas(bgPrimary);
      drawShape(0, canvas.height / 2, (canvas.width / 2) * 0.85, canvas.height / 2, objectColorReverse);
      drawShape(canvas.width - ((canvas.width / 2) * 0.85), canvas.height / 2, (canvas.width / 2) * 0.85, canvas.height / 2, objectColorReverse);
      drawHeroPosition();
      break;
    default:
      break;
  }
}

function main() {
  drawLevel();
  if (rightPressed) {
    hero.x += 7;
    if(upPressed) {
      hero.y -= 16;
    }
  } else if (leftPressed) {
    hero.x -= 7;
    if(upPressed) {
      hero.y -= 16;
    }
  } else if (upPressed) {
    hero.y -= 16;
    if(rightPressed) {
      hero.x += 7;
    } else if(leftPressed) {
      hero.x -= 7;
    }
  }

  if(!upPressed) {
    hero.y += 8;
    if(hero.y > canvas.height / 2 - 40) {
      hero.y = canvas.height / 2 - 20;
    }
  }

  requestAnimationFrame(main);
}

main();