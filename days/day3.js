const fileReader = require('../classes/file-reader');

const mapGrid = fileReader.readInputFile('input3.txt').map(l => l.split(''));

const tree = '#';

partOne();
partTwo();

function partOne() {
    console.log('part one');
    let hPosition = 0;
    const hStep = 3;
    const vStep = 1;
    let treeCount = 0;

    for (let i = 0; i < mapGrid.length; i += vStep) {
        const mapRow = mapGrid[i];

        const mapPosition = mapRow[hPosition];

        if (mapPosition === tree) {
            treeCount++;
        }

        hPosition = (hPosition + hStep) % mapRow.length;
    }

    console.log('trees found', treeCount);
}

function partTwo() {
    console.log('part two');

    const slopes = [
        [1, 1, 0],
        [3, 1, 0],
        [5, 1, 0],
        [7, 1, 0],
        [1, 2, 0]
    ];

    for (let k = 0; k < slopes.length; k++) {
        let hPosition = 0;
        const slope = slopes[k];
        for (let i = 0; i < mapGrid.length; i += slope[1]) {
            const mapRow = mapGrid[i];

            const mapPosition = mapRow[hPosition];

            if (mapPosition === tree) {
                slope[2]++;
            }

            hPosition = (hPosition + slope[0]) % mapRow.length;
        }

        console.log(slope[2]);
    }

    const slopeTotal = slopes.reduce((total, slope) => {
        return total * slope[2];
    }, 1);

    console.log('slope total', slopeTotal);

}
