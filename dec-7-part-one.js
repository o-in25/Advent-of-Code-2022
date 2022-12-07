import fs from 'fs';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-7.txt', 'utf-8');
const reader = readline.createInterface({input});

let tree;
let currentDirectory = '';
let previousDirectory = '';


class Node {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
}

let current = null;
reader.on('line', line => {
    switch(line) {

        // cd /
        case line.match(/\$ cd (\/)/)?.input: {
            const name = line.split(' ')[2];
            tree = new Node({files: [], name});
            current = tree;
            break;
        }

        // cd ..
        case line.match(/\$ cd (\.\.)/)?.input: {

            break;
        }

        // cd <dir>
        case line.match(/\$ cd [a-z]+/)?.input: {
            const name = line.split(' ')[2];
            const child = current.children.find(x => x.value.name === name);
            current = child;
            break;
        }

        // ls
        case line.match(/\$ ls/)?.input: {
            break;
        }

        // dir <name>
        case line.match(/dir [a-z]+/)?.input: {
            const name = line.split(' ')[1];
            if(name === 'e') {
                // console.log(current)
            }
            //console.log(current)
            const node = new Node({files: [], name});
            current.children.push(node);
            break;
        }

        // files
        default:
            break;
    }
});



reader.on('close', () => {
    console.log(JSON.stringify(tree))
});


