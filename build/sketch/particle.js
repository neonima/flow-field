"use strict";
class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 0.6;
        this.color = color(0, 0, 0);
        this.tempColor = color(0, 0, 0);
        this.upColor = color(0, 0, 0);
        this.downColor = color(0, 0, 0);
        this.c = color(0, 0, 0);
    }
    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    applyForce(force) {
        this.acc.add(force);
        this.tempColor = this.c;
        if (force == null)
            return;
        this.tempColor =
            force.copy().heading() > 0
                ? this.upColor
                : this.downColor;
    }
    show() {
        this.color = lerpColor(this.color, this.tempColor, 0.06);
        fill(this.color);
        noStroke();
        circle(this.pos.x, this.pos.y, 1);
    }
    edges() {
        if (this.pos.x > width)
            this.pos.x = 0;
        if (this.pos.x < 0)
            this.pos.x = width;
        if (this.pos.y > height)
            this.pos.y = 0;
        if (this.pos.y < 0)
            this.pos.y = height;
    }
    follow(vectors) {
        const x = floor(this.pos.x / scl);
        const y = floor(this.pos.y / scl);
        const index = x + y * cols;
        const force = vectors[index];
        this.applyForce(force);
    }
}
//# sourceMappingURL=particle.js.map