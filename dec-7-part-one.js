import fs from 'fs';
import _  from 'lodash';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-7.txt', 'utf-8');
const reader = readline.createInterface({input});



const tree = {
    name: '/',
    children: [],
    size: 0
}

let current = tree;
reader.on('line', line => {
    if(line === '$ cd e') {
        console.log(line)
    }
    switch(line) {


        // cd /
        case line.match(/\$ cd (\/)/)?.input: {
            current = tree;
            break;
        }

        // cd ..
        case line.match(/\$ cd (\.\.)/)?.input: {
            current = {...current.parent};
            break;
        }

        // cd <dir>
        case line.match(/\$ cd [a-z]+/)?.input: {
            const name = line.split(' ')[2];
            current = current.children.find(x => x.name === name);
            break;

        }

        // ls
        case line.match(/\$ ls/)?.input: {
            break;
        }

        // dir <name>
        case line.match(/dir [a-z]+/)?.input: {
            const name = line.split(' ')[1];
            const node = {
                name,
                parent: current,
                children: [],
                size: 0
            }
            current.children.push(node)
            break;
        }

        // files
        default: {
            const size = line.split(' ')[0];
            current.size += Number(size);
            break;   
        }
    }

});

function printTree(node, depth = 2) {
    console.log(node.name)
    if (node.children.length > 0) {
        for (const child of node.children) {
            printTree(child, depth + 1);
        }
    } 
}

function getSize(node) {
    if(node.children.length > 0) {
        for(const child of node.children) {
            node.size += child.size;
            if(node.parent) {
                 node.parent.size += child.size;
            }
            getSize(child);
        }
    }
}

reader.on('close', () => {
    //25028495
    // console.log(tree)
    getSize(tree);

    let sum = 0;
    function printTree(node, depth = 0) {
        if (node.children.length) {
            for (const child of node.children) {
                if(child.size < 100000) {
                    sum += child.size
                }
                printTree(child, depth + 1);
            }
        }
    }
    printTree(tree);
    console.log(sum);
});

