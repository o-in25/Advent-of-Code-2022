import fs from 'fs';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-2.txt', 'utf-8');
const reader = readline.createInterface({input});

// rock: a 1
// paper: b 2
// scissors: c 3
// lose: x
// draw: y
// win: z
const actions = {
    a: {
        x: {
            result: 'loss',
            score: 3
        },
        y: {
            result: 'draw',
            score: 1
        },
        z: {
            result: 'win',
            score: 2
        }
    },
    b: {
        x: {
            result: 'loss',
            score: 1
        },
        y: {
            result: 'draw',
            score: 2
        },
        z: {
            result: 'win',
            score: 3
        }
    },
    c: {
        x: {
            result: 'loss',
            score: 2 
        },
        y: {
            result: 'draw',
            score: 3
        },
        z: {
            result: 'win',
            score: 1
        }
    }
}

const results = {
    loss: 0,
    draw: 3,
    win: 6
}

let totalScore = 0;
reader.on('line', line => {
    const input = line.replace(/\s/g, '');
    const opponent = input.charAt(0).toLocaleLowerCase();
    const player = input.charAt(1).toLocaleLowerCase();

    const round = actions[opponent][player];
    totalScore += round.score + results[round.result];
});

reader.on('close', () => {
    console.log(totalScore);
})
