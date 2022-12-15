import { readFileSync } from "fs";
import hash from 'object-hash';
import _ from 'lodash';

const lines = readFileSync("./files/dec-10.txt", { encoding: "utf-8" }).replace(/\r/g, "")
    .trim()
    .split("\n")
    .map(line => {
        const [instruction, value] = line.split(' ');
        return { instruction, value: Number(value || 0)}
    });

class CRT {
    constructor(height = 6, width = 40) {
        this.height = height;
        this.width = width;
        this.lineNumber = 1;
        this.screen = new Array(this.height).fill(0).map(_ => new Array(this.width).fill('.'))
    }

    displayScreen() {
        console.log(this.screen.map(line => line.join('')).join('\n'))
    }

    drawScreen(x, y, char) {
        this.screen[y][x] = char;
    }

    next() {
        this.lineNumber++;
    }
}

let pc = 1;
let $x = 1;
const crt = new CRT();

function noop() {
    pc++;
    checkCycle();
}

function addx(value) {
    pc++;
    checkCycle();
    $x += value;
    pc++;
    checkCycle();
}

function checkCycle() {
    // flips between 1, 2, ... , 40, 1, 2, ...
    const x = crt.lineNumber % crt.width;
    const y = Math.floor(crt.lineNumber / crt.width);

    if(y < crt.height) {
        const char = Math.abs(x - $x) < 2? '#' : '.'
        crt.drawScreen(x, y, char)
        crt.next();    
    }

}

lines.forEach(line => {
    const { instruction, value } = line;
    switch(instruction) {
        case 'noop':
            noop();
            break;
        case 'addx':
            addx(value);
            break;
    }
});

crt.displayScreen(); // fburhzch