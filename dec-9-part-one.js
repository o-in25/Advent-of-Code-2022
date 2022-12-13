import { readFileSync } from "fs";
import hash from 'object-hash';
const lines = readFileSync("./files/dec-9.txt", { encoding: "utf-8" }).replace(/\r/g, "")
    .trim()
    .split("\n")
    .map(line => {
        const [letter, number] = line.split(' ');
        const distance = Number(number);
        const direction = letter.toLowerCase();
        return {direction, distance};
    });


class Knot {    
    // private
    static #moves = {
        r: {x: 1, y: 0},
        l: {x: -1, y: 0},
        u: {x: 0, y: 1},
        d: {x: 0, y: -1}
    };
    // private
    #visted = new Set();
    get visted() {
        return this.#visted;
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(nextMove) {
        const { direction } = nextMove;
        const dx = Knot.#moves[direction].x;
        const dy = Knot.#moves[direction].y;
        this.x += dx;
        this.y += dy;
    }

    markVisited(move) {
        this.#visted.add(hash(move));
    }
}

const head = new Knot(0, 0);
const tail = new Knot(0, 0);

lines.forEach(line => {
    head.move(line);
})

console.log(head)

