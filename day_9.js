const LENGTH = 25;

const findNotFittingElement = array => {
    const notFitting = array.reduce((acc, cur, i) => {
        if (i < LENGTH) return acc;
        const summand1 = [...array].splice(i-LENGTH, LENGTH);
        const summand2 = [...array].splice(i-LENGTH, LENGTH).map(num => cur - num);
        const canMakeSum = summand1.reduce((acc, e, i) => {
            const summand2Temp = [...summand2];
            summand2Temp.splice(i, 1);
            const hasSum = summand2Temp.includes(+e);
            return acc || hasSum;    
        }, false);
        if (!canMakeSum) return cur;
        return acc
    }, -1)
    return notFitting;
};

const solution = (input) => {
    const inputParsed = input.map(num => parseInt(num));
    const notFitting = findNotFittingElement(inputParsed);
    console.log("V1: ", notFitting);

    let result;
    inputParsed.forEach((cur, i) => {
        let sum = 0;
        let index = i;
        while (sum < notFitting) {
            sum = sum + parseInt(input[index]);
            index = index + 1;
        }
        if (sum === notFitting && i !== index -1) {
            const findMinMaxOn = inputParsed.slice(i, index);
            const min = Math.min.apply(null, findMinMaxOn);
            const max = Math.max.apply(null, findMinMaxOn);
            result = min + max;
        }
    })
    console.log("V2: ", result);
};
  
exports.solution = solution;