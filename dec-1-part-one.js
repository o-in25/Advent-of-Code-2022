import fs from 'fs';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-1.txt', 'utf-8');
const reader = readline.createInterface({input});

const data = [];
let calories = 0;
let index = 0;

reader.on('line', line => {
    if(line.length > 0) {
        calories += Number(line);
    } else {
        data.push({index, calories})
        calories = 0;
        index++;
    }
});

reader.on('close', () => {
    const most = Math.max(...data.map(x => x.calories));
    console.log(most)
})
