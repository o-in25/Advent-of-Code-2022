import { lstat, readFileSync } from "fs";
import _ from "lodash";
const pairs = _.chunk(readFileSync("./files/dec-13.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .split("\n")
    .filter(packet => packet !== '')
    .map(packet => JSON.parse(packet)), 2);

const correctPairs = [];
const incorrectPairs = [];

let pairNumber = 1;
for(const pair of pairs) {
    const [left, right] = Object.assign([], pair);
    const valid = read(left, right)
    console.log(`${valid} == Pair ${pairNumber} ==`)
    pairNumber++;
}

function read(left, right) {
    const lhs = left.shift();
    const rhs = right.shift();

    if(!lhs) {
        return true;
    }

    if(!rhs) {
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


function isListEmpty(list) {
    if(Array.isArray(list)) {
        if(list.length === 0) {
            return true;
        }
        return isListEmpty(list.shift());
    }

    return false;

}


