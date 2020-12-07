const decodeRow = (rowCode) => {
    const { max } = rowCode.reduce((acc, current) => {
        const size = acc.size / 2;
        let max = acc.max;
        if (current === "F") {
            max = acc.max - size
        }
        return { size, max };
    }, { size: 128, max: 127 } )
    return max;
}

const decodeColumn = (columnCode) => {
    const { max } = columnCode.reduce((acc, current) => {
        const size = acc.size / 2;
        let max = acc.max;
        if (current === "L") {
            max = acc.max - size
        }
        return { size, max };
    }, { size: 8, max: 7 } )
    return max;
}

const solution1 = (arrayOfSeatCodes) => {
    const solution = arrayOfSeatCodes.map(code => {
        const codeArray = code.split("");
        const row = decodeRow(codeArray.slice(0, 7))
        const column = decodeColumn(codeArray.slice(7))
        return { row, column, seatId: row * 8 + column }
    })

    const maxSeatId = solution.map(({ seatId }) => seatId).reduce((a, b) => Math.max(a, b));
    return maxSeatId
}

const calculatePossibleSeatIds = () => {
    const n = 128 * 8 - 1;
    return Array.from(Array(n).keys());
}

const solution = (arrayOfSeatCodes) => {
    const solution = arrayOfSeatCodes.map(code => {
        const codeArray = code.split("");
        const row = decodeRow(codeArray.slice(0, 7))
        const column = decodeColumn(codeArray.slice(7))
        return row * 8 + column;
    })
    const possibleSeats = calculatePossibleSeatIds();
    const missingSeats = possibleSeats.filter(seat => !solution.includes(seat));
    const mySeat = missingSeats.reduce((acc, current) => {
       const before = current - 1;
       const after = current + 1;
       if (solution.includes(before) && solution.includes(after)) {
           return current;
       } else return acc;
    }, 128 * 8)
    return mySeat;
}

exports.solution = solution;