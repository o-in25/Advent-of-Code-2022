import { readFileSync } from "fs";
import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';
const lines = readFileSync("./files/dec-8.txt", { encoding: "utf-8" }).replace(/\r/g, "").trim().split("\n")
const map = buildMap(lines);
const candidates = [];

for(let row of map) {
    const columns = row.filter(x => x.top !== null).filter(x => x.bottom != null).filter(x => x.right != null).filter(x => x.left !== null)
    for(let column of columns) {
        // check top
        const candidate = checkBoundaries(Object.assign([], map.flat()), column, map);
        if(candidate) {
            candidates.push(column);
        }
    }
}
console.log(candidates.length + getBorderSize(map[0].length)) // 1703


function getBorderSize(n) {
    return (n * 2) + (n - 2 + n - 2)
}

function checkBoundaries(flatMap, plot, map) {
    let count = 0;
    let visible = false;
    ['top', 'bottom', 'left', 'right'].every(direction => {
        let next = flatMap.find(x => x.id === plot[direction]);
        while(true) {
            count++;
            if(plot.value <= next.value) {
                break;
            }

            if(next[direction] === null) {
                visible = true;
                break;
            }

            next = flatMap.find(x => x.id === next[direction]);
        }

        return !visible;
    });

    return visible;

}


function initMap(w, h) {
    const arr = [];
    for(let i = 0; i < h; i++) {
        arr[i] = [];
        for(let j = 0; j < w; j++) {
            const plot = {id: uuidv4(), value: '', left: '', right: '', top: '', bottom: ''}
            arr[i][j] = plot;
        }
    }
    return arr;
}
// console.log(candidates)
function buildMap(lines) {
    const map = initMap(lines.length, lines.map(x => [...x]).length);
    for(let i = 0; i < lines.length; i++) {
        for(let j = 0; j < [...lines[i]].length; j++) {
            const plot = Object.assign({}, map[i][j]);
            plot.coordinates =`row (i): ${i + 1} column (j) ${j + 1}`;
            plot.value = [...lines[i]][j];
            if(i === 0) {
                plot.top = null;
            }
            if(i === lines.length - 1) {
                plot.bottom = null;
            }
            if(j === 0) {
                plot.left = null;
            }
            if(j === [...lines[i]].length - 1) {
                plot.right = null;
            }

            if(plot.top !== null) {
                const top = map[i - 1][j];
                plot.top = top.id;
            }
            if(plot.bottom !== null) {
                const bottom = map[i + 1][j];
                plot.bottom = bottom.id;
            }
            if(plot.left !== null) {
                const left = map[i][j - 1];
                plot.left = left.id;
            }
            if(plot.right !== null) {
                const right = map[i][j + 1];
                plot.right = right.id;
            }

            map[i][j] = plot;
        }
    }
    return map;
}