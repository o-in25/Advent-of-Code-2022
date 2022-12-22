import { readFileSync } from "fs";
import _ from "lodash";
const pairs = _.chunk(readFileSync("./files/dec-13.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .split("\n")
    .filter(packet => packet !== '')
    .map(packet => JSON.parse(packet)), 2);

// pairs.forEach(pair => {
//     const [left, right] = pair;
//     if(left.length === 0) {


//     } else if(2) {

//     }

// });

function emptyList(list) {
    if(Array.isArray(list) && list.length !== 0) {
        return emptyList(list.shift())
    }
    return Array.isArray(list) && list.length === 0;

}

const res = emptyList([[[15]]]);
console.log(res)