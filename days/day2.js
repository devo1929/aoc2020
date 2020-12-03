const fileReader = require('../classes/file-reader');

const passwords = fileReader.readInputFile('input2.txt');
const policyRegex = /(\d+)-(\d+)\s+(\w+):\s+(\w+)/;
const passwordEntries = passwords.map(p => {
    const passwordEntryMatch = policyRegex.exec(p);

    return {
        min: parseInt(passwordEntryMatch[1]),
        max: parseInt(passwordEntryMatch[2]),
        letter: passwordEntryMatch[3],
        password: passwordEntryMatch[4]
    };
});

partOne();
partTwo();

function partOne() {

    const validPasswords = passwordEntries.filter(entry => isValidEntryPartOne(entry));

    console.log('valid part one password count', validPasswords.length);
}

function partTwo() {
    const validPasswords = passwordEntries.filter(entry => isValidEntryPartTwo(entry));
    console.log('valid part two password count', validPasswords.length);
}

function isValidEntryPartOne(entry) {
    const filteredPassword = entry.password.split('').filter(l => l === entry.letter).join('');

    return filteredPassword.length >= entry.min && filteredPassword.length <= entry.max;
}

function isValidEntryPartTwo(entry) {
    const password = entry.password;

    let matchCount = 0;
    if (password[entry.min - 1] === entry.letter) {
        matchCount++;
    }
    if (password[entry.max - 1] === entry.letter) {
        matchCount++;
    }

    return matchCount === 1;
}


