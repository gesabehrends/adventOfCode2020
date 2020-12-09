

const solution1 = (instructions) => {
    const instructionsReady = instructions.map(instruction => {
        const [ op, argument ] = instruction.split(" ");
        return { op, argument: parseInt(argument) };
    })

    const walkThrough = (position, acc) => {
        const {  op, argument, visited } = instructionsReady[position];
        if (visited) {
            console.log(acc);
            return acc;
        }
        else if (op === "acc") {
            instructionsReady[position] = { op, argument, visited: true }
            walkThrough(position + 1, acc + argument);
        } else if (op === "jmp") {
            instructionsReady[position] = { op, argument, visited: true }
            walkThrough(position + argument, acc);
        } else if (op === "nop") {
            instructionsReady[position] = { op, argument, visited: true }
            walkThrough(position + 1, acc);
        } else {
            return "something is wrong";
        }
    }
    const res = walkThrough(0, 0);
    console.log(res);
}

const solution2 = (instructions) => {
    const instructionsReady = instructions.map(instruction => {
        const [ op, argument ] = instruction.split(" ");
        return { op, argument: parseInt(argument) };
    })

    const allPossibleInstructions = instructionsReady.map(({ op, argument }, index) => {
        if (op === "acc") {
            return undefined;
        } else if (op === "jmp") {
            const instructionsReadyClone = [...instructionsReady];
            instructionsReadyClone[index] = { op: "nop", argument };
            return instructionsReadyClone;
        } else if (op === "nop") {
            const instructionsReadyClone = [...instructionsReady];
            instructionsReadyClone[index] = { op: "jmp", argument };
            return instructionsReadyClone;
        }
    });

    const walkThrough = (position, acc, instruction) => {
        if (position === instruction.length) {
            console.log("result is: ", acc);
            return acc;
        }

        const {  op, argument, visited } = instruction[position];
        if (visited) {
            return false;
        }
        else if (op === "acc") {
            instruction[position] = { op, argument, visited: true }
            walkThrough(position + 1, acc + argument, instruction);
        } else if (op === "jmp") {
            instruction[position] = { op, argument, visited: true }
            walkThrough(position + argument, acc, instruction);
        } else if (op === "nop") {
            instruction[position] = { op, argument, visited: true }
            walkThrough(position + 1, acc, instruction);
        } else {
            return false;
        }
    }

    allPossibleInstructions.forEach(instruction => {
        if (!!instruction) {
            const res = walkThrough(0, 0, instruction);
            console.log(res);
            if (res) {
                console.log(res);
            }
        }
    })
}


exports.solution = solution2;