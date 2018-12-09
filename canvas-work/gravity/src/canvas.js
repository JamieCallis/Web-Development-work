// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

var gravity = 4;
var friction = 0.95;
// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

addEventListener("click", function() {

});

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
};

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};

// Constructor function
function Ball(x, y, dy, dx, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;
};

// portotype methods
Object.prototype.update = function() {
    if(this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (this.x + this.radius + this.dx > canvas.width ||
        this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }

    this.y += this.dy;
    this.x += this.dx;
    this.draw();
};

Object.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
};

// Implementation
let objects = [];
let x = undefined;
let y = undefined;
let dx = undefined;
let dy = undefined;
let radius = undefined;
function init() {
    objects = [];


    for (let i = 0; i < 400; i++) {
      radius = randomIntFromRange(8, 20)
      x = randomIntFromRange(radius, canvas.width - radius);
      y = randomIntFromRange(radius, canvas.height - radius);
      dx = randomIntFromRange(-4, 4);
      dy = randomIntFromRange(-4, 4);
      objects.push(new Ball(x, y, dy, dx, radius, randomColor(colors)));
    }

};

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    for(var i = 0; i < objects.length; i++) {
      objects[i].update();
    }

    // objects.forEach(object => {
    //  object.update();
    // });
};

init();
animate();
