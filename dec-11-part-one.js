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
        this.worryLevels = [];
        this.runningTotal = 0;
    }

    play() {
        this.items.forEach(item => {
            this.worryLevel = item;
            this.worryLevel = this.expression.evaluate(item);
            // do this before branch
            this.worryLevel = Math.floor(this.worryLevel / 3);
            const branch =  this.expression.evaluatePredicate(this.worryLevel);
            if(this.worryLevel === 25) {
                console.log(this.worryLevel)
            }
            throwAtMonkey(this.worryLevel, branch);
        });
        this.items = [];
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
        if(this.operand === 'old') {
            console.log('old')
        }
        const operand = this.operand === 'old'? oldValue : Number(this.operand);
        switch(this.operator) {
            case '*': {
                return oldValue * operand;
            }
            case '+': {
                return oldValue + operand;
            }
        }
    }

    evaluatePredicate(value) {
        const predicateResult = value % this.predicate === 0;
        if(predicateResult) {
            return this.branch.trueBranch;
        }
        return this.branch.falseBranch;

    }
}

function throwAtMonkey(worryLevel, monkeyName) {
    const monkey = monkeys.find(monkey => monkey.name === monkeyName);
    monkey.items.push(worryLevel);
    monkey.worryLevels.push(worryLevel)

}
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

monkeys.forEach(monkey => monkey.play())
monkeys.forEach(monkey => monkey.play())
console.log(monkeys);