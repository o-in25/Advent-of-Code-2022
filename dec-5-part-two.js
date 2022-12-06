import fs from 'fs';
import readline from 'readline';
import _ from 'lodash';

const input = fs.createReadStream('./files/dec-5.txt', 'utf-8');
const reader = readline.createInterface({input});

const rows = [];
const instructions = [];

const board = [];

const buildBoard = (size) => {
    const arr = [1];
    for(let i = 0; i < size; i++) {
        arr.push(arr[i] + 4)
    }
    return arr;
}

// 3x3 1, 5, 9, 13
let lineNumber = 1;
reader.on('line', line => {
    if(lineNumber <= 8) {
        buildBoard(9).reduce((acc, val, index) => {
            if(line.charAt(val).trim() !== '') {
                acc.push({index, data: line.charAt(val)})
            }

            return acc;
        }, rows)
    }

    if(lineNumber >= 11) {
        const set = line.replace(/\D/g, '');
        if(set.length === 4) {
            instructions.push({
                move: Number(set.charAt(0).concat(set.charAt(1))),
                from: Number(set.charAt(2)),
                to: Number(set.charAt(3))
            })        
        } else {
            instructions.push({
                move: Number(set.charAt(0)),
                from: Number(set.charAt(1)),
                to: Number(set.charAt(2))
            })
        }

    }
    lineNumber++;
});

reader.on('close', () => {
    Object.entries(_.groupBy(rows, 'index')).forEach(([key, val]) => {
        const data = val.map(x => x.data);
        board.push({index: Number(key) + 1, data: _.reverse(data)})
    })
    instructions.forEach(instruction => {
        const from = board.find(x => x.index === instruction.from);
        const to = board.find(x => x.index === instruction.to);
        let popped = [];
        for(let i = 0; i < instruction.move; i++) {
            popped.push(from.data.pop())
        }
        popped = _.reverse(popped);
        console.log(popped)
        popped.forEach(x => to.data.push(x))
    });

    
    const result = board.reduce((acc, val) => acc.concat(_.last(val.data)), '')
    console.log(result) // ZHSVRMJT

})