let inc = 0.08;
let scl = 50;
let rows = 0;
let cols = 0;
let zoff = 0;
let magn = 0.005;
let zoffStep = 0.0001;

let particles: Particle[] = [];
let flowField: p5.Vector[];
let particleSize = 50;
let c: p5.Color;
let tempColor: p5.Color;
let upColor: p5.Color;
let downColor: p5.Color;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, P2D);
  background(20);
  colorMode(RGB, 255);
  cols = floor(innerWidth / scl);
  rows = floor(innerHeight / scl);
  c = color(random(150, 225), random(150, 225), random(150, 225), 25);
  upColor = color(random(180, 225), random(150, 225), random(100, 255), 25);
  downColor = color(random(150, 225), random(180, 225), random(100, 255), 25);
  for (let i = 0; i < particleSize; i++) {
    particles[i] = new Particle();
    particles[i].c = c;
    particles[i].color = c;
    particles[i].tempColor = tempColor;
    particles[i].upColor = upColor;
    particles[i].downColor = downColor;
  }
  flowField = new Array<p5.Vector>(cols * rows);
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      const index = x + y * cols;
      const angle = noise(xoff, yoff, zoff) * TWO_PI;
      const v = p5.Vector.fromAngle(angle);
      v.setMag(magn);
      flowField[index] = v;
      xoff += inc;
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      pop();
    }
    yoff += inc;
    zoff += zoffStep;

    for (let i = 0; i < particles.length; i++) {
      particles[i].follow(flowField);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }
  }
}
