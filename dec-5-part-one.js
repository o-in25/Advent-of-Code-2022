import fs from 'fs';
import readline from 'readline';
import _ from 'lodash';

const input = fs.createReadStream('./files/dec-5.txt', 'utf-8');
const reader = readline.createInterface({input});

const rows = [];
// 3x3 1, 5, 9
let lineNumber = 1;
reader.on('line', line => {
    if(lineNumber <= 3) {
        [1, 5, 9].forEach((match, index, arr) => {
            if(line.charAt(match).trim() !== '') {
                rows.push({index, data: line.charAt(match)})
            }
        })
        
    }
    lineNumber++;
});

reader.on('close', () => {
    const board = [];
    Object.entries(_.groupBy(rows, 'index')).forEach(([key, val]) => {
        board.push({index: Number(key) + 1, data: val.map(x => x.data)})
    })

    console.log(board)
})