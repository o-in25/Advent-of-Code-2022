import { readFileSync } from "fs";
import hash from 'object-hash';
const lines = readFileSync("./files/dec-9.txt", { encoding: "utf-8" }).replace(/\r/g, "")
    .trim()
    .split("\n")
    .map(line => {
        const [letter, number] = line.split(' ');
        const distance = Number(number);
        const direction = letter.toLowerCase();
        return { direction, distance };
    });

class Knot {    
    static moves = {
        r: {x: 1, y: 0},
        l: {x: -1, y: 0},
        u: {x: 0, y: 1},
        d: {x: 0, y: -1}
    };

    // https://en.wikipedia.org/wiki/Taxicab_geometry
    static manhattanDistance(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    static isDiagonal(dx, dy) {
        return Math.abs(dx) - Math.abs(dy) === 0;
    }

    visted = new Set();

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }


    move(direction) {
        const move = Knot.moves[direction];
        const {x, y} = move;
        this.x += x;
        this.y += y;
    }

    follow(knot) {
        const distance = Knot.manhattanDistance(knot.x, this.x, knot.y, this.y);
        const dx = knot.x - this.x;
        const dy = knot.y - this.y;
        // distance is 2 or more and we're not diagonal
        if(distance >= 2 && !Knot.isDiagonal(dx, dy)) {
            // we're not touching
            if(dx > 0) {
                this.x++;
            } else if(dx < 0) {
                this.x--;
            }

            if(dy > 0) {
                this.y++;
            } else if(dy < 0) {
                this.y--;
            }
        
        }
    }

    markVisited(x, y) {
        this.visted.add(hash({x, y}));
    }
}

const head = new Knot(0, 0);
const tail = new Knot(0, 0);

lines.forEach(line => {
    const {direction, distance} = line;
    for(let i = 0; i < distance; i++) {
        head.move(direction);
        tail.follow(head);
        tail.markVisited(tail.x, tail.y);
    }
})

const size = tail.visted.size;
console.log(size) // 6470

