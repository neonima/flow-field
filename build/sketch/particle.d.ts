/// <reference types="p5" />
declare class Particle {
    pos: p5.Vector;
    vel: p5.Vector;
    acc: p5.Vector;
    maxSpeed: number;
    color: p5.Color;
    c: p5.Color;
    tempColor: p5.Color;
    upColor: p5.Color;
    downColor: p5.Color;
    constructor();
    update(): void;
    applyForce(force: p5.Vector): void;
    show(): void;
    edges(): void;
    follow(vectors: p5.Vector[]): void;
}
