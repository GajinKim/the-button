const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const Ball = function (color, x, y, radius) {
  this.color = color;
  this.radius = radius;
  this.speed = Math.random() * 3 + 1;
  this.x = x;
  this.y = y;
  this.direction = Math.random() * Math.PI * 2;
};

Ball.prototype = {
  updatePosition: function (width, height) {
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;

    if (this.x - this.radius < 0) {
      this.x = this.radius;

      this.direction = Math.atan2(
        Math.sin(this.direction),
        Math.cos(this.direction) * -1
      );
    } else if (this.x + this.radius > width) {
      this.x = width - this.radius;

      this.direction = Math.atan2(
        Math.sin(this.direction),
        Math.cos(this.direction) * -1
      );
    }

    if (this.y - this.radius < 0) {
      this.y = this.radius;

      this.direction = Math.atan2(
        Math.sin(this.direction) * -1,
        Math.cos(this.direction)
      );
    } else if (this.y + this.radius > height) {
      this.y = height - this.radius;

      this.direction = Math.atan2(
        Math.sin(this.direction) * -1,
        Math.cos(this.direction)
      );
    }
  },
};

var redBalls = new Array();
var greenBalls = new Array();
var blueBalls = new Array();

redCounter = document.getElementById("red-counter").innerHTML;
greenCounter = document.getElementById("green-counter").innerHTML;
blueCounter = document.getElementById("blue-counter").innerHTML;

function updateCounters() {
  redCounterCurrent = document.getElementById("red-counter").innerHTML;
  greenCounterCurrent = document.getElementById("green-counter").innerHTML;
  blueCounterCurrent = document.getElementById("blue-counter").innerHTML;

  if (isNaN(redCounter)) {
    redCounter = redCounterCurrent;
    for (i = 0; i < parseInt(redCounter); i++) {
      redBalls.push(new Ball("red", x, y, 10));
    }
  } else {
    if (redCounter != redCounterCurrent) {
      ballsToAdd = parseInt(redCounterCurrent) - parseInt(redCounter);
      for (i = 0; i < ballsToAdd; i++) {
        redBalls.push(new Ball("red", x, y, 10));
      }
    }
  }

  if (isNaN(greenCounter)) {
    greenCounter = greenCounterCurrent;
    for (i = 0; i < parseInt(greenCounter); i++) {
      greenBalls.push(new Ball("green", x, y, 10));
    }
  } else {
    if (greenCounter != greenCounterCurrent) {
      ballsToAdd = parseInt(greenCounterCurent) - parseInt(greenCounter);
      for (i = 0; i < ballsToAdd; i++) {
        greenBalls.push(new Ball("green", x, y, 10));
      }
    }
  }

  if (isNaN(blueCounter)) {
    blueCounter = blueCounterCurrent;
    for (i = 0; i < parseInt(blueCounter); i++) {
      blueBalls.push(new Ball("blue", x, y, 10));
    }
  } else {
    if (blueCounter != blueCounterCurrent) {
      ballsToAdd = parseInt(blueCounterCurrent) - parseInt(blueCounter);
      for (i = 0; i < ballsToAdd; i++) {
        blueBalls.push(new Ball("blue", x, y, 10));
      }
    }
  }
}

// TODO change this to random starting location within frame
let x = document.documentElement.clientWidth * 0.5;
let y = document.documentElement.clientHeight * 0.5;

function loop() {
  window.requestAnimationFrame(loop);

  let height = document.documentElement.clientHeight;
  let width = document.documentElement.clientWidth;

  context.canvas.height = height;
  context.canvas.width = width;

  for (let i = 0; i < redBalls.length; i++) {
    let ball = redBalls[i];

    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();

    ball.updatePosition(width, height);
  }

  for (let i = 0; i < greenBalls.length; i++) {
    let ball = greenBalls[i];

    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();

    ball.updatePosition(width, height);
  }

  for (let i = 0; i < blueBalls.length; i++) {
    let ball = blueBalls[i];

    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();

    ball.updatePosition(width, height);
  }
}

loop();
