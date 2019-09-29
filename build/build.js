"use strict";
var Particle = (function () {
    function Particle() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 0.6;
        this.color = color(0, 0, 0);
        this.tempColor = color(0, 0, 0);
    }
    Particle.prototype.update = function () {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    };
    Particle.prototype.applyForce = function (force) {
        this.acc.add(force);
        this.tempColor = color(0, 255, 0);
        if (force == null)
            return;
        this.tempColor = (force.copy().heading() > 0) ? color(240, 3, 252, 125) : color(3, 252, 227, 125);
    };
    Particle.prototype.show = function () {
        this.color = lerpColor(this.color, this.tempColor, 0.008);
        fill(this.color);
        noStroke();
        circle(this.pos.x, this.pos.y, 0.5);
    };
    Particle.prototype.edges = function () {
        if (this.pos.x > width)
            this.pos.x = 0;
        if (this.pos.x < 0)
            this.pos.x = width;
        if (this.pos.y > height)
            this.pos.y = 0;
        if (this.pos.y < 0)
            this.pos.y = height;
    };
    Particle.prototype.follow = function (vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    };
    return Particle;
}());
var inc = 0.08;
var scl = 50;
var rows = 0;
var cols = 0;
var zoff = 0;
var magn = 0.005;
var zoffStep = 0.0001;
var particles = [];
var flowField;
var particleSize = 50;
function setup() {
    createCanvas(window.innerWidth, window.innerHeight, P2D);
    background(0);
    colorMode(RGB, 255);
    cols = floor(innerWidth / scl);
    rows = floor(innerHeight / scl);
    for (var i = 0; i < particleSize; i++) {
        particles[i] = new Particle();
    }
    flowField = new Array(cols * rows);
}
function draw() {
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = x + y * cols;
            var angle = noise(xoff, yoff, zoff) * TWO_PI;
            var v = p5.Vector.fromAngle(angle);
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
        for (var i = 0; i < particles.length; i++) {
            particles[i].follow(flowField);
            particles[i].update();
            particles[i].edges();
            particles[i].show();
        }
    }
}
//# sourceMappingURL=build.js.map