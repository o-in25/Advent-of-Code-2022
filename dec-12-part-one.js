import { readFileSync } from "fs";

class Pair {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const grid = readFileSync("./files/dec-12.txt", { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map(line => [...line]);

let [start, end] = getStartAndEnd(grid).map(point => new Pair(point.row, point.col));

const visited = new Set();

shortestPath(start, end);
console.log(visited.size)
//console.log(grid[0].length, "<===========")
function shortestPath(start, end) {
    if(start.x === 2 && start.y === 4) {
        console.log('yue')
    }
    if(start.x === end.x && start.y === end.y) {
        console.log('end')
        return;
    }
    visited.add(`${start.y}-${start.x}`)


    // down
    if(isValid(start, start.x, start.y - 1)) {
        start.y--;
        shortestPath(start, end)
    }

    // right 
    if(isValid(start, start.x + 1, start.y)) {
        start.x++;
        shortestPath(start, end)
    }

    // top
    if(isValid(start, start.x, start.y + 1)) {
        start.y++;
        shortestPath(start, end)
    }

    // left
    if(isValid(start, start.x - 1, start.y)) {
        start.x--;
        shortestPath(start, end)
    }



    visited.delete(`${start.x}-${start.y}`)
}

// x = col
// y = row
function isValid(current, x, y) {
    if(y < 0 || x < 0 || y > grid.length - 1 || x > grid[0].length - 1) {
        return false;
    }

    if(visited.has(`${y}-${x}`)) {
        return false;
    }

    if(grid[current.y][current.x] === 'S' || grid[y][x] === 'S') {
        return true;

    }
    const currentChar = grid[current.y][current.x].toLocaleLowerCase().charCodeAt(0) - 96;
    const nextChar = grid[y][x].toLocaleLowerCase().charCodeAt(0) - 96;

    if(nextChar - currentChar >= 2) {
        return false;
    }

    return true;
}

function getStartAndEnd(grid) {
    const points = [];
    for(let row = 0; row < grid.length; row++) {
        for(let col = 0; col < grid[row].length; col++) {
            const current = grid[row][col];
            if(current === 'S' || current === 'E') {
                points.push({current, row, col});
            }
        }
    }
    return points;
}


// JavaScript code to implement the approach
 
 
// // User defined Pair class
// class Pair {
//     constructor(x, y)
//     {
//         this.first = x;
//         this.second = y;
//     }
// }
 
// // Check if it is possible to go to (x, y) from the current
// // position. The function returns false if the cell has
// // value 0 or already visited
// function isSafe(mat, visited, x, y)
// {
//     return (x >= 0 && x < mat.length && y >= 0
//             && y < mat[0].length && mat[x][y] == 1
//             && !visited.has(`${x}-${y}`));
// }
 
// function findShortestPath(mat, visited, i, j, x, y,
//                           min_dist, dist)
// {
//     if (i == x && j == y) {
//         min_dist = Math.min(dist, min_dist);
//         return min_dist;
//     }
//     // set (i, j) cell as visited
//     visited.add(`${i}-${j}`)
//     // go to the bottom cell
//     if (isSafe(mat, visited, i + 1, j)) {
//         min_dist
//             = findShortestPath(mat, visited, i + 1, j, x, y,
//                                min_dist, dist + 1);
//     }
//     // go to the right cell
//     if (isSafe(mat, visited, i, j + 1)) {
//         min_dist
//             = findShortestPath(mat, visited, i, j + 1, x, y,
//                                min_dist, dist + 1);
//     }
//     // go to the top cell
//     if (isSafe(mat, visited, i - 1, j)) {
//         min_dist
//             = findShortestPath(mat, visited, i - 1, j, x, y,
//                                min_dist, dist + 1);
//     }
//     // go to the left cell
//     if (isSafe(mat, visited, i, j - 1)) {
//         min_dist
//             = findShortestPath(mat, visited, i, j - 1, x, y,
//                                min_dist, dist + 1);
//     }
//     // backtrack: remove (i, j) from the visited matrix
//     visited.delete(`${i}-${j}`);
//     return min_dist;
// }
 
// // Wrapper over findShortestPath() function
// function findShortestPathLength(mat, src, dest)
// {

 
//     let row = mat.length;
//     let col = mat[0].length;
//     // construct an `M × N` matrix to keep track of visited
//     // cells
//     let visited = new Set();
 
//     let dist = Number.MAX_SAFE_INTEGER;
//     dist = findShortestPath(mat, visited, src.first,
//                             src.second, dest.first,
//                             dest.second, dist, 0);
 
//     if (dist != Number.MAX_SAFE_INTEGER)
//         return dist;
//     return -1;
// }
 
// // Driver code
 
// let mat = [
//     [ 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ],
//     [ 1, 0, 1, 0, 1, 1, 1, 0, 1, 1 ],
//     [ 1, 1, 1, 0, 1, 1, 0, 1, 0, 1 ],
//     [ 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
//     [ 1, 1, 1, 0, 1, 1, 1, 0, 1, 0 ],
//     [ 1, 0, 1, 1, 1, 1, 0, 1, 0, 0 ],
//     [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
//     [ 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ],
//     [ 1, 1, 0, 0, 0, 0, 1, 0, 0, 1 ]
// ];
 
// let src = new Pair(0, 0);
// let dest = new Pair(3, 4);
// let dist = findShortestPathLength(mat, src, dest);
// if (dist != -1)
//     console.log("Shortest Path is " + dist);
 
// else
//     console.log("Shortest Path doesn't exist");
 
// // This code is contributed by phasing17