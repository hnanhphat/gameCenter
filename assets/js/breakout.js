var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = (canvas.width - ballRadius) / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var target = 0;
var score = 0;
var level = 1;
var lives = 3;

var bricks = [];

function createGameTarget() {
  score = 0;
  target = 0;
  for (var i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (var j = 0; j < brickRowCount; j++) {
      bricks[i][j] = {
        x: 0,
        y: 0,
        status: Math.floor(Math.random() * level + 1),
      };
      target += bricks[i][j].status;
    }
  }
}
createGameTarget();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft / 2;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    } else if (paddleX < 0) {
      paddleX = 0;
    }
  }
}

function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status >= 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status--;
          score++;
          if (score == target) {
            alert("YOU WIN, CONGRATULATIONS!");
            // document.location.load();
            level++;
            createGameTarget();
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width - paddleWidth) / 2;
          }
          console.log(score);
          console.log(target);
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBrick(x, y, color) {
  ctx.beginPath();
  ctx.rect(x, y, brickWidth, brickHeight);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status >= 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        switch (bricks[c][r].status) {
          case 2:
            drawBrick(brickX, brickY, '#ffc04d');
            break;
          case 3:
            drawBrick(brickX, brickY, '#ff4d4d');
            break;
          case 4:
            drawBrick(brickX, brickY, '#80ff00');
            break;
          case 5:
            drawBrick(brickX, brickY, '#ffc0cb');
            break;
          case 6:
            drawBrick(brickX, brickY, '#800080');
            break;
          case 7:
            drawBrick(brickX, brickY, '#b3b300');
            break;
          case 8:
            drawBrick(brickX, brickY, '#000');
            break;
          default:
            drawBrick(brickX, brickY, '#0095DD');
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawLevel() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.textAlign = "center";
  ctx.fillText("Level: " + level, canvas.width / 2, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  drawScore();
  drawLives();
  drawLevel();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius - paddleHeight && x > paddleX && x < paddleX + paddleWidth) {
    dy = -dy
  } else if (y + dy > canvas.height - ballRadius) {
    lives--;
    if (!lives) {
      alert('GAME OVER');
      document.location.reload();
    } else {
      x = canvas.width / 2;
      y = canvas.height - 30;
      dx = 2;
      dy = -2;
      paddleX = (canvas.width - paddleWidth) / 2;
    }
  }

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();