var inc = 0.3
var scl = 10
var rows = 0
var cols = 0
var zoff = 0

var particles: Array<Particle> = []
var flowField: p5.Vector[]
var particleSize: number = 50


function setup() {
    createCanvas(750, 750)
    background(255)
    cols = floor(width / scl)
    rows = floor(height / scl)
    for (var i = 0; i < particleSize; i++) {
        particles[i] = new Particle()
    }
    flowField = new Array<p5.Vector>(cols * rows)

}

function draw() {


    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0
        for (var x = 0; x < cols; x++) {
            var index = x + y * cols
            var angle = noise(xoff, yoff, zoff) * TWO_PI
            var v = p5.Vector.fromAngle(angle)
            v.setMag(0.005)
            flowField[index] = v
            xoff += inc
            push()
            translate(x * scl, y * scl)
            rotate(v.heading())
            pop()
        }
        yoff += inc
        zoff += 0.0001

        for (var i = 0; i < particles.length; i++) {

            particles[i].follow(flowField)
            particles[i].update()
            particles[i].edges()
            particles[i].show()

        }
    }

}