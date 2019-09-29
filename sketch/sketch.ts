let inc = 0.08
let scl = 50
let rows = 0
let cols = 0
let zoff = 0
let magn = 0.005
let zoffStep = 0.0001

let particles: Array<Particle> = []
let flowField: p5.Vector[]
let particleSize: number = 50

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, P2D)
    background(0)
    colorMode(RGB, 255)
    cols = floor(innerWidth / scl)
    rows = floor(innerHeight / scl)
    for (let i = 0; i < particleSize; i++) {
        particles[i] = new Particle()
    }
    flowField = new Array<p5.Vector>(cols * rows)
    let t = createSlider(0.00001, 1, 0.00001, 0.00001)
    t.position(10, 10)
    t.style('width', '80px')
}

function draw() {
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            let index = x + y * cols
            let angle = noise(xoff, yoff, zoff) * TWO_PI
            let v = p5.Vector.fromAngle(angle)
            v.setMag(magn)
            flowField[index] = v
            xoff += inc
            push()
            translate(x * scl, y * scl)
            rotate(v.heading())
            pop()
        }
        yoff += inc
        zoff += zoffStep

        for (let i = 0; i < particles.length; i++) {
            particles[i].follow(flowField)
            particles[i].update()
            particles[i].edges()
            particles[i].show()
        }
    }

}
