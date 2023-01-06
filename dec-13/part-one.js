import { readFileSync } from "fs";
import _ from "lodash";

// for debugging 
const pairs = _.chunk(readFileSync("./files/dec-13.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .split("\n")
    .filter(packet => packet !== '')
    .map(packet => JSON.parse(packet)), 2);

const indicies = pairs.reduce((acc, curr, index) => {
    const [left, right] = Object.assign([], curr);
    const valid = compare(left, right)
    if(valid) {
        acc.push(index + 1);
    }
    return acc;
}, []);
const sum = indicies.reduce((acc, curr) => acc + curr, 0)
console.log(sum) // 5684


function compare(left, right) {

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
        if(lhs.length === 0 && rhs.length === 0 && left.length && right.length)  {
            return compare(left, right)
        } 
        return compare(lhs, rhs);
    } else {
        // left one array? then right is number
        if(Array.isArray(lhs)) {
            return compare(lhs, [rhs])
        } else {
            // probs dont need to do else here but fuck it
            return compare([lhs], rhs)
        }
    }

    if(!left.length && !right.length) {
        return true;
    }
    
    return compare(left, right);
    // 1 of each
}
