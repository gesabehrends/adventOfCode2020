const moveInDirection = (position, instruction) => {
    let newPosition = position;
    switch (instruction.direction) {
        case "N":
            newPosition.x = position.x + instruction.steps;
            break;
        case "S":
            newPosition.x = position.x - instruction.steps;
            break;
        case "E":
            newPosition.y = position.y + instruction.steps;
            break;
        case "W":
            newPosition.y = position.y - instruction.steps;
            break;
        default:
          break;
      }
    return newPosition;
}

mapDegreeToOrientation = (currentOrientation, degree) => {
    let currentOrientationInDegree;
    switch(currentOrientation) {
        case "N":
            currentOrientationInDegree = 0;
            break;
        case "S":
            currentOrientationInDegree = 180;
            break;
        case "E":
            currentOrientationInDegree = 90;
            break;
        case "W":
            currentOrientationInDegree = 270;
            break;
        default:
          break;
    }
    let newOrientation;
    switch((currentOrientationInDegree + degree + 360) % 360) {
        case 0:
            newOrientation = "N";
            break;
        case 90:
            newOrientation = "E";
            break;
        case 180:
            newOrientation = "S";
            break;
        case 270:
            newOrientation = "W";
            break;
        default:
          break;
    }
    return newOrientation;
}

moveWayPointByDegree = (wayPoint, angle) => {
    const radians = (Math.PI / 180) * angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const nx = cos * (wayPoint.x) - (sin * (wayPoint.y));
    const ny = cos * (wayPoint.y) + (sin * (wayPoint.x));
    return {x: Math.round(nx), y: Math.round(ny)};
}

const oneStep = (position, instruction, face) => {
    let newPosition = position;
    let newFace = face;
    if (["N", "S", "W", "E"].includes(instruction.direction)) {
        newPosition = moveInDirection(position, instruction);
    } else if (instruction.direction === "F") {
        newPosition = moveInDirection(position, { direction: face, steps: instruction.steps });
    } else if (["R", "L"].includes(instruction.direction)) {
        const moveDegree = instruction.direction === "L" ? -instruction.steps : instruction.steps;
        newFace = mapDegreeToOrientation(face, moveDegree);
    }
    return ({ newPosition, newFace });
}

const moveInDirectionOfWayPoint = (position, wayPoint, steps) => {
    const newPosition = { 
        x: position.x + (steps * wayPoint.x),
        y: position.y + (steps * wayPoint.y),
     }
     return newPosition;
}

const oneStep2 = (position, instruction, wayPoint) => {
    let newPosition = position;
    let newWayPoint = wayPoint;
    if (["N", "S", "W", "E"].includes(instruction.direction)) {
        newWayPoint = moveInDirection(wayPoint, instruction);
    } else if (instruction.direction === "F") {
        newPosition = moveInDirectionOfWayPoint(position, wayPoint, instruction.steps);
    } else if (["R", "L"].includes(instruction.direction)) {
        const moveDegree = instruction.direction === "L" ? -instruction.steps : instruction.steps;
        newWayPoint = moveWayPointByDegree(wayPoint, moveDegree);
    }
    return ({ newPosition, newWayPoint });
}


// start at (0/0)
const solution1 = input => {
    const instructions = input.map(line => {
        const lineArray = line.split("");
        const direction = lineArray[0];
        let steps = lineArray.slice(1);
        steps = parseInt(lineArray.slice(1).join(""));
        return {direction, steps};
    });
    const {position}  = instructions.reduce(({ position, face }, instruction) => {
            const { newPosition, newFace } = oneStep(position, instruction, face);
            console.log(instruction, newPosition, newFace);
            return {position: newPosition, face: newFace};
        }, {  position: { x: 0, y: 0 }, face: "E"});
    const manhattenDistance = Math.abs(position.x) + Math.abs(position.y);
    return manhattenDistance;
}

const solution2 = input => {
    const instructions = input.map(line => {
        const lineArray = line.split("");
        const direction = lineArray[0];
        let steps = lineArray.slice(1);
        steps = parseInt(lineArray.slice(1).join(""));
        return {direction, steps};
    });
    const {position}  = instructions.reduce(({ position, wayPoint }, instruction) => {
            const { newPosition, newWayPoint } = oneStep2(position, instruction, wayPoint);
            console.log(instruction, newPosition, newWayPoint);
            return {position: newPosition, wayPoint: newWayPoint};
        }, {  position: { x: 0, y: 0 }, wayPoint: { x: 1, y: 10 }});
    const manhattenDistance = Math.abs(position.x) + Math.abs(position.y);
    return manhattenDistance;
}


const solution = (input) => {
    console.log("V1: ", solution1(input));
    console.log("V2: ", solution2(input));
};
  
exports.solution = solution;