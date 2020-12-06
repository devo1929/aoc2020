const PassportScanner = require('../classes/passport-scanner');

const passportScanner = new PassportScanner();

partOne();
partTwo();

function partOne() {

    const passports = passportScanner.getPassports('input4.txt');

    console.log('valid passports part one', passports.filter(p => p.isValidPartOne()).length);
}

function partTwo() {
    const passports = passportScanner.getPassports('input4.txt');

    console.log('valid passports part two', passports.filter(p => p.isValidPartTwo()).length);
}

