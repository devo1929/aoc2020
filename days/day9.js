const fileReader = require('../classes/file-reader');

const lines = fileReader.readInputFile('input9.txt')
    .map(l => parseInt(l));

const preambleSize = 25;
let sumNotFoundNumber;

partOne();
partTwo();

function partOne() {
    for (let i = preambleSize; i < lines.length; i++) {
        const num = lines[i];

        const preceding = lines.slice(i - preambleSize, i);

        let foundSum = false;
        for (let k = 0; k < preceding.length - 1; k++) {
            const val1 = preceding[k];
            for (let j = k + 1; j < preceding.length; j++) {
                const val2 = preceding[j];
                if (val1 + val2 === num) {
                    foundSum = true;
                    break;
                }
            }
            if (foundSum) {
                break;
            }
        }

        if (!foundSum) {
            sumNotFoundNumber = num;
            console.log('sum not found', num);
        }
    }
}

function partTwo() {

    let weaknessFound = false;
    let start = 0;
    while (!weaknessFound) {
        const numbers = [];
        let sum = 0;
        let i = 0;
        for (i = start; sum < sumNotFoundNumber;i++) {
            const num = lines[i];
            numbers.push(num);
            sum += num;
        }
        if(sum === sumNotFoundNumber) {
            weaknessFound = true;
            const smallest = Math.min(...numbers);
            const largest = Math.max(...numbers);
            console.log('weakness found', smallest + largest);
        }
        start++;
    }
}
