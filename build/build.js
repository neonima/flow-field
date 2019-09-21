var Particle = (function () {
    function Particle() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 0.6;
    }
    Particle.prototype.update = function () {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    };
    Particle.prototype.applyForce = function (force) {
        this.acc.add(force);
    };
    Particle.prototype.show = function () {
        stroke(0, 5);
        point(this.pos.x, this.pos.y);
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
var inc = 0.3;
var scl = 10;
var rows = 0;
var cols = 0;
var zoff = 0;
var particles = [];
var flowField;
var particleSize = 50;
function setup() {
    createCanvas(750, 750);
    background(255);
    cols = floor(width / scl);
    rows = floor(height / scl);
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
            v.setMag(0.005);
            flowField[index] = v;
            xoff += inc;
            push();
            translate(x * scl, y * scl);
            rotate(v.heading());
            pop();
        }
        yoff += inc;
        zoff += 0.0001;
        for (var i = 0; i < particles.length; i++) {
            particles[i].follow(flowField);
            particles[i].update();
            particles[i].edges();
            particles[i].show();
        }
    }
}
//# sourceMappingURL=build.js.map