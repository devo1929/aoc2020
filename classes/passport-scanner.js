const fs = require('fs');
const path = require('path');
const Passport = require('./passport');

class PassportScanner {

    getInputLines(filename) {
        const filePath = path.join(__dirname, '..', 'inputs', filename);

        return fs.readFileSync(filePath).toString().trim().split('\n').map(s => s.trim());
    }

    /**
     *
     * @param inputLines string[]
     */
    getRawPassports(inputLines) {
        let rawPassport = '';
        const rawPassports = [];

        for (let i = 0, l = inputLines.length; i < l; i++) {
            const line = inputLines[i];
            rawPassport += ` ${line}`;

            if (line.trim().length === 0) {
                rawPassports.push(rawPassport.trim());
                rawPassport = '';
            }
        }
        if (rawPassport.trim().length > 0) {
            rawPassports.push(rawPassport.trim());
        }

        return rawPassports
    }

    getPassports(filename) {
        const lines = this.getInputLines(filename);
        const rawPassports = this.getRawPassports(lines);
        return rawPassports.map(rawPassport => Passport.fromRawPassport(rawPassport));
    }

}

module.exports = PassportScanner;
