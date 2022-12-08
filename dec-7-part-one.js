import fs from 'fs';
import _  from 'lodash';
import readline from 'readline';

const input = fs.createReadStream('./files/dec-7.txt', 'utf-8');
const reader = readline.createInterface({input});


const lines = [];
reader.on('line', line => lines.push(line));
reader.on('close', () => {
    const tree = buildTree(lines);
    showTree(tree);

    const threshold = 100000;
    let runningSum = 0;

    function find(node) {
        if(node.type !== 'directory') {
            return Number(node.size);
        }
    
        const sizes = node.children.map(child => find(child));
        const sum = sizes.reduce((acc, val) => acc + val, 0)
        if(sum <= threshold) {
            runningSum += sum;
        }
        return sum;
    }

    find(tree);
    console.log(runningSum); // 1611443
});

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