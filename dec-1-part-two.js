import fs from 'fs';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-1.txt', 'utf-8');
const reader = readline.createInterface({input});

const data = [];
let counter = 0;
let index = 0;

reader.on('line', line => {
    if(line.length > 0) {
        counter += Number(line);
    } else {
        data.push({index, counter})
        counter = 0;
        index++;
    }
});

reader.on('close', () => {
    const winners = [];
    for(let i = 0; i < 3; i++) {
        const filtered = data.reduce((acc, prev) => prev.counter > acc?.counter ? prev : acc)
        winners.push(filtered);
        data.splice(filtered.index, 1);
    }
    const total = winners.reduce((acc, prev) => acc + prev.counter, 0)
    console.log(total);
})
