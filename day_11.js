const isSeatInPlan = (rowsNum, columnsNum, checkSeat) => {
    return (checkSeat.column < columnsNum && 
    checkSeat.column >= 0 &&
    checkSeat.row < rowsNum &&
    checkSeat.row >= 0);
}

const countNumberOfAdjacentOccupiedSeats = (seats, rowsNum, columnsNum) => (rowSeat, columnSeat) => {
    let numberOfOccupiedAdjacent = 0;
    const neighbourRowOption = [rowSeat - 1, rowSeat, rowSeat + 1];
    const neighbourColumnOption = [columnSeat - 1, columnSeat, columnSeat + 1];
    neighbourRowOption.forEach((row) => {
        neighbourColumnOption.forEach(
            column => {
                if (
                    isSeatInPlan(rowsNum, columnsNum, { row, column }) &&
                    !((rowSeat === row) && (columnSeat === column))
                ) {
                    if (seats[row][column] === "#") {
                        numberOfOccupiedAdjacent = numberOfOccupiedAdjacent + 1;
                    }
                }
            }
        )
    })
    return numberOfOccupiedAdjacent;
}

const countNumberOfOccupiedVisibleSeats = (seats, rowsNum, columnsNum) => (rowStart, columnStart) => {
    
    const findOccupiedInLineOfSight = (move, start) => {
        let checkSeat = { row: start.row + move.row, column: start.column + move.column };
        if (
            isSeatInPlan(rowsNum, columnsNum, checkSeat) &&
            seats[checkSeat.row][checkSeat.column] === "."
        ) {
            return findOccupiedInLineOfSight( move, checkSeat);  
        } else if ( 
            !isSeatInPlan(rowsNum, columnsNum, checkSeat)
        ) {
            return 0;
        } else if ( seats[checkSeat.row][checkSeat.column] === "L" ) {
            return 0;
        } else if ( seats[checkSeat.row][checkSeat.column] === "#" ) {
            return 1;
        }
    }
    
    let numberOfOccupiedVisible = 0;
    const rowMove = [-1, 0, 1];
    const columnMove = [-1, 0, 1];

    rowMove.forEach( row => {
        columnMove.forEach( column => {
            if (!(row === 0 && column ===0) ){
                numberOfOccupiedVisible = numberOfOccupiedVisible + findOccupiedInLineOfSight({ row, column }, { row: rowStart, column: columnStart });
            }
        } )
    } )
    return numberOfOccupiedVisible;

};

const isSameSeatingPattern = (seats1, seats2) => {
    let isSame = true;
    seats1.forEach((row, index) => {
        isSame = isSame && seats2[index] === row;
    })
    return isSame;
}

const countOverallNumberOfOccupiedSeats = seats => {
    let numberOccupied = 0;
    seats.forEach(row => {
        numberOccupied = numberOccupied + row.split("#").length - 1;
    })
    return numberOccupied;
}

const oneRoundSeating = (seats, tooManyNeighboursNumber, countFunction) => {
    const newSeats = seats.reduce((newSeats, currentRow, rowIndex) => {
        const getNumberOfSeats = countFunction(seats.map(seats => seats.split("")), seats.length, seats[0].length);
        const newRow = currentRow.split("").map((seat, columnIndex) => {
            if (seat === ".") {
                return "."
            } else if (seat === "#") {
                if (getNumberOfSeats(rowIndex, columnIndex) >= tooManyNeighboursNumber ) {
                    return "L";
                } else {
                    return "#"
                }
            } else if (seat === "L") {
                if (getNumberOfSeats(rowIndex, columnIndex) === 0 ) {
                    return "#";
                } else {
                    return "L"
                }
            }
        }).join("");
        newSeats.push(newRow);
        return newSeats;
    }, []);
    return newSeats;

}

const solution1 = (input) => {
    let newSeatingPattern = oneRoundSeating(input, 4, countNumberOfAdjacentOccupiedSeats);
    if (!isSameSeatingPattern(input, newSeatingPattern)) {
        return solution1(newSeatingPattern);
    }
    return countOverallNumberOfOccupiedSeats(newSeatingPattern);
}

const solution2 = (input) => {
    let newSeatingPattern = oneRoundSeating(input, 5, countNumberOfOccupiedVisibleSeats);
    if (!isSameSeatingPattern(input, newSeatingPattern)) {
        return solution2(newSeatingPattern);
    }
    return countOverallNumberOfOccupiedSeats(newSeatingPattern);
}

const solution = (input) => {
    console.log("V1: ", solution1(input));
    console.log("V2: ", solution2(input));
}

exports.solution = solution;