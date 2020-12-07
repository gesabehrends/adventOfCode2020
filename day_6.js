const solution1 = (answerSets) => {
    const answeredYes = answerSets.map(set => set.split("/n").join().split(""));
    const possibleAnswers = "abcdefghijklmnopqrstuvwxyz".split("");
    const answersPerGroup = answeredYes.map((answeredYes) => possibleAnswers.filter(possible => answeredYes.includes(possible)).join(""));

    const allYesses = answersPerGroup.join("")
    return allYesses.length;
}

const solution = (answerSets) => {
    const answeredYes = answerSets.map(set => set.split("\n"));
    
    console.log("Input: ", answerSets)
    console.log("answeredYes: ", answeredYes)

    const allYes = answeredYes.map( groupAnswers => (groupAnswers.reduce(
        (acc, current) => acc.split("").filter(char => current.split("").includes(char)).join(""), groupAnswers[0]
    )));
    return allYes.flat(2).join("").length;
}

exports.solution = solution;