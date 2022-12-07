import fs from 'fs';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-7.txt', 'utf-8');
const reader = readline.createInterface({input});

const instructions = [];
const tree = {};
let currentDirectory = '/';
reader.on('line', line => {
    if(line.match(/\$ cd ([a-z]+)|(\/)|(\.\.)/)) {
        const [delimiter, command, destination] = line.split(' ');
        currentDirectory = destination;
        if(!(destination in tree) && destination !== '..' && destination !== '/') {
            tree[currentDirectory] = {files: []};
        } else if(!(destination in tree) && destination !== '..' && destination === '/') {
            tree.files = [];
        }
    } else if(!line.match(/\$ ls/)) {
        if(currentDirectory === '/') {
            if(!line.match(/dir [a-z]+/)) {
                const [size, name] = line.split(' ');
                tree.files.push({name, size})
            }
        }
    }
});

reader.on('close', () => {
    console.log(tree)
});


