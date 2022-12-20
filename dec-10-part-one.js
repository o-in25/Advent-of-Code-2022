import { readFileSync } from "fs";

const lines = readFileSync("./files/dec-10.txt", { encoding: "utf-8" }).replace(/\r/g, "")
    .trim()
    .split("\n")
    .map(line => {
        const [instruction, value] = line.split(' ');
        return { instruction, value: Number(value || 0)}
    });


let pc = 1;
let $x = 1;
const cycles = [20, 60, 100, 140, 180, 220];
const sums = [];
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
    if(cycles.includes(pc)) {
        const cycle = cycles[cycles.indexOf(pc)];
        sums.push(cycle * $x);
    }
}

lines.forEach(line => {

    const { instruction, value } = line;
    switch(instruction) {
        case 'noop':
            noop();
            break;
        case 'addx':
            addx(value)
            break;
    }


})


const sum = sums.reduce((acc, cur) => acc + cur, 0);
console.log(sum) // 13720