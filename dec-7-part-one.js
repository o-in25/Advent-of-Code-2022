import fs from 'fs';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-7.txt', 'utf-8');
const reader = readline.createInterface({input});

const tree = {};
let currentDirectory = '';
let previousDirectory = '';
reader.on('line', line => {
    switch(line) {
        // cd /
        case line.match(/\$ cd (\/)/)?.input:
            // init the tree
            currentDirectory = '/';
            tree.files = [];
            break;
        // cd ..
        case line.match(/\$ cd (\.\.)/)?.input:
            const parent = Object.entries(tree).find(([key, val]) => val[currentDirectory]);
            if(parent) {
                currentDirectory = parent[0];
            } else {
                currentDirectory = '/'
            }
            break;
        // cd <dir>
        case line.match(/\$ cd [a-z]+/)?.input:
            const dest = line.split(' ')[2];
            previousDirectory = currentDirectory;
            currentDirectory = dest;
            break;
        // ls
        case line.match(/\$ ls/)?.input:
            break;

        // dir <name>
        case line.match(/dir [a-z]+/)?.input:
            const name = line.split(' ')[1];

            if(currentDirectory === '/') {
                if(!tree[name]) {
                    tree[name] = {};
                }
                tree[name].files = [];
            } else {

                console.log(name, tree)
                if(!tree[currentDirectory][name]) {
                    tree[currentDirectory][name] = {};
                }
                tree[currentDirectory][name] = {};

            }
        // files
        default:
            break;
    }
});

reader.on('close', () => {
    //console.log(tree)
});


