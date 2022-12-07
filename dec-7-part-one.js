import fs from 'fs';
import readline from 'readline';
import _ from 'lodash';

const input = fs.createReadStream('./files/dec-7.txt', 'utf-8');
const reader = readline.createInterface({input});

let tree;
let sum = [];

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
            const parent = findParent([tree], current.value.name);
            current = parent;
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
            const node = new Node({files: [], name});
            current.children.push(node);
            break;
        }

        // files
        default:
            const [size, name] = line.split(' ');
            current.value.files.push({name, size});
            break;
    }


      
    function findParent(tree, name) {
        for(let node of tree) {
            if(node.value.name === name) {
                return node;
            }

            if(node.children.length > 0) {
                if(findParent(node.children, name)) {
                    return node;
                }
            }
        }
        return false;
    }



});



reader.on('close', () => {
    console.log(tree)
});

