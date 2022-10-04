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
// color, starting x, starting y, radius
var balls = new Array();

redCounter = document.getElementById("red-counter");
greenCounter = document.getElementById("green-counter");
blueCounter = document.getElementById("blue-counter");

// TODO change this to random starting location within frame
let x = document.documentElement.clientWidth * 0.5;
let y = document.documentElement.clientHeight * 0.5;

// while (!Number.isInteger(redCounter)) {
//   redCounter = document.getElementById("red-counter");
// }

for (let i = 0; i < parseInt(redCounter); i++) {
  balls.push(new Ball("red", x, y, Math.floor(Math.random() * 10 + 20)));
}
function loop() {
  window.requestAnimationFrame(loop);

  let height = document.documentElement.clientHeight;
  let width = document.documentElement.clientWidth;

  context.canvas.height = height;
  context.canvas.width = width;

  for (let index = 0; index < balls.length; index++) {
    let ball = balls[index];

    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();

    ball.updatePosition(width, height);
  }
}

loop();
