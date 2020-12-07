const solution = (input) => {
    let wrongpw = 0;
    const policyArray = input.map(line => {
        [policy, pw] = line.split(':').map(i => i.trim());
        [times, letter] = policy.split(" ").map(i => i.trim());
        [lower, upper] = times.split("-").map(i => i.trim());
        const countChar = pw.split(letter).length - 1
        if (countChar < +lower || countChar > +upper) {
            wrongpw = wrongpw + 1;
            console.log(line, ": >>>>> ", pw, countChar, lower, upper)
        }

    })
    return wrongpw;
};
  
exports.solution = solution;