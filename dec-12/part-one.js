import { readFileSync } from "fs";

class Node {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

const grid = readFileSync("./files/dec-12.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .trim()
    .split("\n")
    .map(line => [...line]);
    
const [start, end] = (grid => {
    const points = [];
    for(let row = 0; row < grid.length; row++) {
        for(let col = 0; col < grid[row].length; col++) {
            const current = grid[row][col];
            if(current === 'S' || current === 'E') {
                points.push(new Node(row, col));
            }
        }
    }
    return points;
})(grid);

grid[end.row][end.col] = 'z'
grid[start.row][start.col] = 'a'
const CHAR_OFFSET = 96;
const visted = new Set();


function bfs(start, end) {
    const queue = [];
    queue.push({node: start, distance: 0});
    visted.add(`(${start.row}, ${start.col})`)
    
    while(queue.length) {
        // dequeue
        const {node, distance} = queue.shift();

        // at end?
        if(node.row === end.row && node.col === end.col) {
            return distance;
        }

        // check left
        if(isSafe(node, node.row - 1, node.col) && !hasVisited(node.row - 1, node.col)) {
            const newNode = enqueue(queue, node.row - 1, node.col, distance);
            markVisted(newNode);
        }

        // check down 
        if(isSafe(node, node.row, node.col - 1) && !hasVisited(node.row, node.col - 1)) {
            const newNode = enqueue(queue, node.row, node.col - 1, distance);
            markVisted(newNode);
        }

        // check down 
        if(isSafe(node, node.row, node.col + 1) && !hasVisited(node.row, node.col + 1)) {
            const newNode = enqueue(queue, node.row, node.col + 1, distance);
            markVisted(newNode);
        }

        // check down 
        if(isSafe(node, node.row + 1, node.col) && !hasVisited(node.row + 1, node.col)) {
            const newNode = enqueue(queue, node.row + 1, node.col, distance);
            markVisted(newNode);
        }
    }
}

function enqueue(queue, newRow, newCol, distance) {
    const node = new Node(newRow, newCol);
    queue.push({node, distance: distance + 1});
    return node;
}

function isSafe(current, newRow, newCol) {
    if(newRow < 0 || newCol < 0 || newRow > grid.length - 1 || newCol > grid[0].length - 1) {
        return false;
    }


    const currentChar = grid[current.row][current.col].charCodeAt(0) - CHAR_OFFSET;
    const newChar = grid[newRow][newCol].charCodeAt(0) - CHAR_OFFSET;
    return newChar - currentChar <= 1;
}

function hasVisited(newRow, newCol) {
    return visted.has(`(${newRow}, ${newCol})`);
}

function markVisted(node) {
    visted.add(`(${node.row}, ${node.col})`)
}

const distance = bfs(start, end);
console.log(distance) // 330