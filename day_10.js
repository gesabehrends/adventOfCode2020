const solution1 = (inputRaw) => {
    const input = [0, ...inputRaw.map(jolt => parseInt(jolt))];
    input.sort((a, b) => a - b);
    const { ones, threes } = input.reduce((acc, current, i) => {
        if (i === 0) return acc;
        if (current - input[i - 1] === 1) {
            acc.ones = acc.ones + 1;
        } else if (current - input[i - 1] === 3) {
            acc.threes = acc.threes + 1;
        }  
        return acc;
    }, { ones: 0, threes: 1 })
    return (ones * threes);
};

const solution2 = (inputRaw) => {
    const input = inputRaw.map(jolt => parseInt(jolt));
    input.sort((a, b) => a - b);
    const lookUpTable = input.reduce((lookUpTable, currentElement) => {
        const op1 = lookUpTable[currentElement - 1];
        const op2 = lookUpTable[currentElement - 2];
        const op3 = lookUpTable[currentElement - 3];
        lookUpTable[currentElement] = (op1 || 0) + (op2 || 0) + (op3 || 0)
        return lookUpTable;
    }, { 0: 1})
    return lookUpTable[input[input.length - 1]];
}

const solution = (input) => {
    console.log("V1: ", solution1(input));
    console.log("V2: ", solution2(input));
}
  
exports.solution = solution;