import fs from 'fs';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-6.txt', 'utf-8');
const reader = readline.createInterface({input});

const buffer = [];
reader.on('line', line => buffer.push(line));

reader.on('close', () => {
    for(let i = 0; i < buffer.length; i++) {
        const current = buffer[i];
        const charSet = [...buffer[i]];
        const bufferSet = [];
        for(let j = 0; j < charSet.length; j++) {
            const str = current.slice(j, j + 14);
            bufferSet.push([...new Set(str)])
        }
        const match = bufferSet.find(x => x.length === 14);
        const str = match.reduce((acc, val) => acc.concat(val),'')
        const chars = current.indexOf(str) + str.length;
        console.log(chars) // 2508
    }
})