import fs from 'fs';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-6.txt', 'utf-8');
const reader = readline.createInterface({input});
const offset = 4;
reader.on('line', line => {
    const bufferSet = [];
    for(let i = 0; i < [...line].length; i++) {
        const str = line.slice(i, i + offset);
        bufferSet.push([...new Set(str)])
    }
    const matchStr = bufferSet.find(x => x.length === offset).reduce((acc, val) => acc.concat(val),'');
    const chars = line.indexOf(matchStr) + matchStr.length;
    console.log(chars) // 1804
});

