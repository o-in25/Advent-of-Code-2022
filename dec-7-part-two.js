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
let totalUsed = 0;
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
            totalUsed += Number(size)

            current.size += Number(size);
            break;   
        }
    }

});

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
    const max = 70000000;
    const min = 30000000;
    getSize(tree)
    let candidates = [];
    const available = max - totalUsed;
    const softMin = min - available;
    function filterTree(node, threshold) {
        if (node.children.length) {
            for (const child of node.children) {
                if(child.size >= threshold) {
                    candidates.push({name: child.name, size: child.size})
                }
                filterTree(child, threshold);
            }
        }
    }    

    filterTree(tree, softMin);
    candidates.sort((a, b) => a.size - b.size);

    console.log(candidates)
});

