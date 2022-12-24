import { readFileSync } from "fs";
import _ from "lodash";

// for debugging 
const answers = [3, 5, 6, 8, 9, 12, 13, 14, 15, 17, 18, 20, 21, 25, 27, 29, 30, 35, 40, 41, 46, 48, 52, 53, 55, 57, 58, 59, 61, 63, 64, 65, 71, 72, 74, 75, 76, 78, 79, 80, 83, 84, 86, 88, 89, 90, 93, 95, 96, 98, 99, 102, 103, 104, 107, 110, 111, 112, 113, 114, 121, 122, 125, 127, 130, 131, 134, 136, 139, 141, 142, 143, 145, 148, 149];

const pairs = _.chunk(readFileSync("./files/dec-13.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .split("\n")
    .filter(packet => packet !== '')
    .map(packet => JSON.parse(packet)), 2);

console.log(pairs[0].flat())
const indicies = pairs.reduce((acc, curr, index) => {
    const [left, right] = Object.assign([], curr);
    const valid = read(left, right)
    if(valid) {
        acc.push(index + 1);
    }
    return acc;
}, []);
console.log(_.difference(indicies, answers), '<==')

// line 46
const sum = indicies.reduce((acc, curr) => acc + curr, 0)
console.log(sum)
 // 5940. 5692
// 5684


function read(left, right) {

    const lhs = left.shift();
    const rhs = right.shift();


    if(lhs === undefined) {
        return true;
    }

    if(rhs === undefined) {
        return false;
    }

    // both numbers
    if(!Array.isArray(lhs) && !Array.isArray(rhs)) {
        if(lhs !== rhs) {
            return lhs < rhs;
        }
    } else if(Array.isArray(lhs) && Array.isArray(rhs)) {
        return read(lhs, rhs);
    } else {
        // left one array? then right is number
        if(Array.isArray(lhs)) {
            return read(lhs, [rhs])
        } else {
            // probs dont need to do else here but fuck it
            return read([lhs], rhs)
        }
    }


    if(!left.length && !right.length) {
        return true;
    }
    return read(left, right);
    // 1 of each



}
