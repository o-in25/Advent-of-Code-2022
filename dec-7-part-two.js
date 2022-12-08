import fs from 'fs';
import _  from 'lodash';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-7.txt', 'utf-8');
const reader = readline.createInterface({input});


const lines = [];
reader.on('line', line => lines.push(line));
reader.on('close', () => {
    const diskSpace = 70000000;
    const minimumSpace = 30000000;

    const tree = buildTree(lines);
    showTree(tree);
    const usedSpace = find(tree);

    const availableSpace = diskSpace - usedSpace;
    const requirement = minimumSpace - availableSpace;
    const candidates = [];
    find(tree, (node, sum) => {
        if(sum >= requirement) {
            candidates.push({name: node.name, size: sum})
        }
    });
    
    const candidate = Math.min(...candidates.map(x => x.size));
    console.log(candidate) // 2086088

});

function find(node, callback = () => {}) {
    if(node.type !== 'directory') {
        return Number(node.size);
    }
    const sizes = node.children.map(child => find(child, callback));
    const sum = sizes.reduce((acc, val) => acc + val, 0)
    callback(node, sum);
    return sum;
}

function showTree(node, depth = 0) {
    console.log(`${' '.repeat(depth * 2)} - ${node.name} ${node.type === 'directory'? '(dir)' : `file, size=${node.size})`}`);
    for(let child of node.children) {
        showTree(child, depth + 1);
    }
}

function buildTree(lines) {
    const tree = {
        name: '/',
        children: [],
        size: 0,
        type: 'directory'
    }
    let current = tree;
    lines.forEach(line => {
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
                    size: 0,
                    parent: current,
                    children: [],
                    type: 'directory'
                }
                current.children.push(node)
                break;
            }
    
            // files
            default: {
                const [size, name] = line.split(' ');
                const node = {
                    name, 
                    size,
                    parent: current,
                    children: [],
                    type: 'file'
                }
                current.children.push(node)
                break;
            }
        }
    });

    return tree;
}