import fs from 'fs';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-3.txt', 'utf-8');
const reader = readline.createInterface({input});

const data = [];
const rucksack = [];
const groupSize = 3;
reader.on('line', line => data.push(line));

reader.on('close', () => {
    const groups = data.map((val, index) => index % groupSize === 0 && data.slice(index, index + groupSize))
        .filter(x => x);
    groups.forEach(group => {
        const [group1, group2, group3] = group;
        [...group1].every(char => {
            if(group2.includes(char) && group3.includes(char)) {
                rucksack.push(char);
                return false;
            }
            return true;
        })
    })

    const filter = rucksack.map(x => {
        if(x.toLowerCase() === x) {
            return x.charCodeAt(0) - 96
        } 
        return (x.toLowerCase().charCodeAt(0) - 96) + 26
    });
    const sum = filter.reduce((acc, prev) => acc + prev, 0);
    console.log(sum)

})
