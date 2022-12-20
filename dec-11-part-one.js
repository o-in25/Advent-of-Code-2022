import { readFileSync } from "fs";

const lines = readFileSync("./files/dec-11.txt", { encoding: "utf-8" })
    .trim()
    .split("\n\n")
    .map(line => line.split('\n').map(line => line.trim(' ')));


class Monkey {
    constructor(name, items, expression) {
        this.name = name;
        this.items = items;
        this.expression = expression;
        this.worryLevel = 1;
    }

    play() {
        this.items.forEach(item => {
            this.worryLevel = item;
            let expr = this.expression.evaluate(this.worryLevel);
            // do this before branch
            const newValue = Math.floor(expr / 3);
            const branch = this.expression.evaluatePredicate(newValue);
            const val = [newValue, branch];
            console.log(val)
        });
    }
}

class Expression {
    constructor(operation, predicate, branch) {
        const [operator, operand] = operation;
        this.operator = operator;
        this.operand = operand;
        this.branch = branch;
        this.predicate = predicate;
    }

    evaluate(oldValue) {
        switch(this.operator) {
            case '*': {
                return oldValue * this.operand;
            }
            case '+': {
                return oldValue + this.operand;
            }
        }
    }

    evaluatePredicate(value) {
        const predicateResult = value % this.predicate === 0;
        if(predicateResult) {
            this.branch.trueBranch;
        }
        return this.branch.falseBranch;

    }
}


// lines.forEach((line, index) => {
//     let [name, items, operation, predicate, trueBranch, falseBranch] = line;
//     items = items.split(':')[1].split(',').map(item => Number(item.trim()));
//     console.log(operation)
//     operation = operation.split(':')[1].trim(' ').slice(10).split(' '); //let [ operator, operand ] = operation;
//     predicate = Number(predicate.substring(19));
//     trueBranch = Number(trueBranch.substring(25));
//     falseBranch = Number(falseBranch.substring(26));

//     const monkey = new Monkey(index, items, new Expression(operation, predicate, {trueBranch, falseBranch}));
//     monkies.push(monkey);
// });


const monkeys  = lines.reduce((acc, curr, index) => {
    let [name, items, operation, predicate, trueBranch, falseBranch] = curr;
    items = items.split(':')[1].split(',').map(item => Number(item.trim()));
    console.log(operation)
    operation = operation.split(':')[1].trim(' ').slice(10).split(' '); //let [ operator, operand ] = operation;
    predicate = Number(predicate.substring(19));
    trueBranch = Number(trueBranch.substring(25));
    falseBranch = Number(falseBranch.substring(26));

    const monkey = new Monkey(index, items, new Expression(operation, predicate, {trueBranch, falseBranch}));
    acc.push(monkey);
    return acc;
}, []);

console.log(monkeys);