import fs from 'fs';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-3.txt', 'utf-8');
const reader = readline.createInterface({input});

const rucksack = [];
reader.on('line', line => {
    const spilt = line.length / 2;
    const part1 = line.substring(0, spilt);
    const part2 = line.substring(spilt);
    for(let i = 0; i < part1.length; i++) {
        if(part2.includes(part1.charAt(i))) {
            rucksack.push(part1.charAt(i));
            break;
        }
    }

});

reader.on('close', () => {
    const filter = rucksack.map(x => {
        if(x.toLowerCase() === x) {
            return x.charCodeAt(0) - 96
        } 
        return (x.toLowerCase().charCodeAt(0) - 96) + 26
    });
    const sum = filter.reduce((acc, prev) => acc + prev, 0);
    console.log(sum)
})
/*
a 27
b 28
c 29
d 30
e 31
f 32
g 33
h 34
i 35
j 36
k 37
l 38
m 39
*/