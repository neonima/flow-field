class Particle {
    pos: p5.Vector
    vel: p5.Vector
    acc: p5.Vector
    maxSpeed: number
    color: p5.Color
    tempColor: p5.Color

    constructor() {
        this.pos = createVector(random(width), random(height))
        this.vel = createVector(0, 0)
        this.acc = createVector(0, 0)
        this.maxSpeed = 0.6
        this.color = color(0, 0, 0)
        this.tempColor = color(0, 0, 0)
    }

    update() {
        this.vel.add(this.acc)
        this.vel.limit(this.maxSpeed)
        this.pos.add(this.vel)
        this.acc.mult(0)
    }

    applyForce(force: p5.Vector) {
        this.acc.add(force)
        this.tempColor = color(0, 255, 0)
        if (force == null) return
        this.tempColor = (force.copy().heading() > 0) ? color(240, 3, 252, 125) : color(3, 252, 227, 125)
    }

    show() {
        //stroke(0, 5)
        // strokeWeight(1)
        // strokeWeight(1)
        this.color = lerpColor(this.color, this.tempColor, 0.008)
        fill(this.color)
        noStroke()
        circle(this.pos.x, this.pos.y, 0.5)

    }

    edges() {
        if (this.pos.x > width) this.pos.x = 0
        if (this.pos.x < 0) this.pos.x = width
        if (this.pos.y > height) this.pos.y = 0
        if (this.pos.y < 0) this.pos.y = height
    }

    follow(vectors: p5.Vector[]) {
        let x = floor(this.pos.x / scl)
        let y = floor(this.pos.y / scl)
        let index = x + y * cols
        let force = vectors[index]
        this.applyForce(force)
    }
}
