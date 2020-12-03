const FileReader = require('../classes/file-reader');
const fileReader = new FileReader();

partOne();
partTwo();

function partOne() {
    const entries = fileReader.readInputFile('input1.txt').map(s => parseInt(s));
    const sumMatch = 2020;

    for (let i = 0; i < entries.length - 1; i++) {
        for (let k = i + 1; k < entries.length; k++) {
            const entry1 = entries[i];
            const entry2 = entries[k];

            if (entry1 + entry2 === sumMatch) {
                console.log(entry1 * entry2);
                return;
            }
        }
    }
    console.log('no sum match found for part one');
}

function partTwo() {
    const entries = fileReader.readInputFile('input1.txt').map(s => parseInt(s));
    const sumMatch = 2020;

    for (let i = 0; i < entries.length - 2; i++) {
        for (let k = i + 1; k < entries.length - 1; k++) {
            for (let v = k + 1; v < entries.length; v++) {

                const entry1 = entries[i];
                const entry2 = entries[k];
                const entry3 = entries[v];

                if (entry1 + entry2 + entry3 === sumMatch) {
                    console.log(entry1 * entry2 * entry3);
                    return;
                }
            }
        }
    }
    console.log('no sum match found for part two');
}
