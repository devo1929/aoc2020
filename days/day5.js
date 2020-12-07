const fileReader = require('../classes/file-reader');

const seats = fileReader.readInputFile('input5.txt');

partOne();
partTwo();

function partOne() {
    const seatIds = getSeatIds(seats);
    const maxSeatId = getMaxSeatId(seatIds);

    console.log('part one - max seat ID', maxSeatId);
}

function partTwo() {
    const seatIds = getSeatIds(seats);
    const maxSeatId = getMaxSeatId(seatIds);

    const mySeatId = getMySeatId(maxSeatId, seatIds);

    console.log('part two - my seat ID', mySeatId);
}

function getMySeatId(maxSeatId, seatIds) {
    let previousSeat = -1;

    for (let i = 0; i <= maxSeatId; i++) {

        if (seatIds.indexOf(i) === -1) {
            if (i === previousSeat + 1) {
                previousSeat++;
                continue;
            }
            return i;
        }
    }
}

function getMaxSeatId(seatIds) {
    return seatIds.sort((a, b) => b - a)[0];
}

function getSeatIds(seats) {
    return seats.map(seat => {
        return getSeatId(seat);
    })
}

function getSeatId(seat) {
    const rows = seat.substr(0, 7).split('');
    const cols = seat.substr(7).split('');

    let rowMin = 0;
    let rowMax = 127;
    let colMin = 0;
    let colMax = 7;

    rows.forEach(row => {
        const half = (rowMax - rowMin) / 2 + rowMin;
        switch (row) {
            case 'F':
                rowMax = Math.floor(half);
                break;
            case 'B':
                rowMin = Math.ceil(half);
        }
    });

    const row = rowMin;

    cols.forEach(col => {
        const half = (colMax - colMin) / 2 + colMin;
        switch (col) {
            case 'L':
                colMax = Math.floor(half);
                break;
            case 'R':
                colMin = Math.ceil(half);
        }
    });

    const col = colMin;

    return row * 8 + col;
}
