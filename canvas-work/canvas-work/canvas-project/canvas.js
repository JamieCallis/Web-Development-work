var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');
// (x, y, width, height)
// context.fillStyle = 'rgba(255,0,0, 0.1)';
// context.fillRect(100, 100, 100, 100);

//Line
// context.beginPath();
// // (x, y)
// context.moveTo(50, 300);
// // (x, y)
// context.lineTo(300, 100);
// context.lineTo(400, 300);
// context.lineTo(100, 300);
// context.strokeStyle = "#fa34a3";
// context.stroke();

// // arc / Circle
// var y = null;
// var x= null;
// var value1 = null;
// var value2 = null;
// var value3 = null;
// var opacity = null;
// for(var i = 0; i < 10000; i++) {
//   x = Math.random() * window.innerWidth;
//   y = Math.random() * window.innerHeight;
//   value1 = Math.random() * 255;
//   value2 = Math.random() * 255;
//   value3 = Math.random() * 255;
//   opacity = Math.random() * 1;
//   context.beginPath();
//   context.arc(x, y, 30, 0, Math.PI * 2, false);
//   context.strokeStyle = `rgba(${value1}, ${value2}, ${value3}, ${opacity})`;
//   context.stroke();
// }
var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 100;
var minRadius = 5;

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})


function Circle(x, y, dx, dy, radius, red, blue, green, alpha) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.red = red;
  this.blue = blue;
  this.green = green;
  this.aplha = alpha;
  this.draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = (`rgba(${red}, ${blue}, ${green}, ${alpha})`);
    context.strokeStyle = `rgba(${red}, ${blue}, ${green}, ${alpha})`;
    context.stroke();
    context.fill();
  }

  this.update = function() {
    if( this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if( this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > - 50
    && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if(this.radius < maxRadius) {
        this.radius += 5;
      }
    } else if(this.radius > minRadius) {
      this.radius -= 5;
    }

    this.draw();
  }
}
var circleArray = [];

var radius = undefined;
var x = undefined;
var y = undefined;
var dx = undefined;
var dy = undefined;
var red = undefined;
var blue = undefined;
var green = undefined;
var alpha = undefined;

function init() {
  circleArray = [];
  for( var i = 0; i < 1500; i++) {
    radius = Math.random() * 100;
    x = Math.random() * (canvas.width - radius * 2) + radius;
    y = Math.random() * (canvas.height - radius * 2) + radius;

    dx = (Math.random() -0.5) * 8;
    dy = (Math.random() -0.5) * 8;

    red = Math.random() * 255;
    blue = Math.random() * 255;
    green = Math.random() * 255;
    alpha = Math.random() * 1;

    circleArray.push(new Circle(x, y, dx, dy, radius, red, blue, green, alpha));
  }
}

init();

function animate() {
  // creates a loop
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
