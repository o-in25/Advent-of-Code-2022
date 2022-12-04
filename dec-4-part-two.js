import fs from 'fs';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-4.txt', 'utf-8');
const reader = readline.createInterface({input});

const lines = [];
reader.on('line', line => lines.push(line.split(',')));

reader.on('close', () => {
    const result = lines.reduce((acc, val) => {
        let [first, second] = val;
        first = first.split('-').map(x => Number(x));
        second = second.split('-').map(x => Number(x))
        acc.push([first, second]);
        return acc;
    }, []);

    const count = result.reduce((acc, val) => {
        const [left, right] = val;
        if(left[0] >= right[0] || left[1] >= right[1]) {
            acc++;
            console.log(val)
        }
        return acc;

    }, 0)
    console.log(count)
});
