class Particle {
    pos: p5.Vector
    vel: p5.Vector
    acc: p5.Vector
    maxSpeed: number

    constructor() {
        this.pos = createVector(random(width), random(height))
        this.vel = createVector(0, 0)
        this.acc = createVector(0, 0)
        this.maxSpeed = 0.6
    }

    update() {
        this.vel.add(this.acc)
        this.vel.limit(this.maxSpeed)
        this.pos.add(this.vel)
        this.acc.mult(0)
    }

    applyForce(force: p5.Vector) {
        this.acc.add(force)
    }

    show() {
        stroke(0, 5)
        // strokeWeight(1)
        point(this.pos.x, this.pos.y)
    }

    edges() {
        if (this.pos.x > width) this.pos.x = 0
        if (this.pos.x < 0) this.pos.x = width
        if (this.pos.y > height) this.pos.y = 0
        if (this.pos.y < 0) this.pos.y = height
    }

    follow(vectors: p5.Vector[]) {
        var x = floor(this.pos.x / scl)
        var y = floor(this.pos.y / scl)
        var index = x + y * cols
        var force = vectors[index]
        this.applyForce(force)
    }
}