import fs from 'fs';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-4.txt', 'utf-8');
const reader = readline.createInterface({input});

const lines = [];
let count = 0;
reader.on('line', line => lines.push(line.split(',')));

reader.on('close', () => {
    const result = lines.reduce((acc, val) => {
        // console.log(val)
        let [first, second] = val;
        first = first.split('-').map(x => Number(x));
        second = second.split('-').map(x => Number(x))
        acc.push([first, second]);
        return acc;
    }, []);

    // console.log(result)
    result.forEach(element => {
        const [left, right] = element;
        if(right[0] >= left[0] && right[1] <= left[1]){
            count++
        } else if(left[0] >= right[0] && left[1] <= right[1]) {
            count++;
        }
    });
    console.log(count)
});
