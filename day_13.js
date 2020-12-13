const solution1 = input => {
    const timestamp = input[0];
    const busses = input[1].split(",");

    const waitingTime = busses.filter(bus => (bus !== "x")).map(bus => ({ 
        busId: bus,
        waitingTime: (timestamp % bus) === 0 ? 0 : bus - (timestamp % bus),
    }));
    waitingTime.sort((a, b) => a.waitingTime - b.waitingTime);
    return waitingTime[0].busId * waitingTime[0].waitingTime;
}

const solution2 = input => {
    const equations = input[1].split(",").map((bus, index) => ( (bus !== "x") ? {
        modulo: parseInt(bus),
        residue: index,
    } : false)).filter(bus => bus);
    const superBus = equations.reduce((combinedEquation, newBusAddedIn) => ruleForTwoBussesCombined(combinedEquation, newBusAddedIn), { residue: 0, modulo: 1 });
    return superBus.residue;
}

ruleForTwoBussesCombined = (bus1, bus2) => {
    // earliest startTime is the one allowed by the 1st bus (in the reduce all busses until the current tested one)
    let newResidue = bus1.residue;
    // find the 1st of the 1st (the superbus) working also for the second
    while (!((newResidue + bus2.residue) % bus2.modulo === 0)) {
        newResidue = newResidue + bus1.modulo;
    }
    return { residue: newResidue, modulo: bus1.modulo * bus2.modulo };
}

const solution = (input) => {
    console.log("V1: ", solution1(input));
    console.log("V2: ", solution2(input));
};
  
exports.solution = solution;