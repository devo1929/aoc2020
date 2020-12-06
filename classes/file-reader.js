const fs = require('fs');
const path = require('path');


class FileReader {
    readFileLines(path) {
        return fs.readFileSync(path).toString().trim().split('\n').map(s => s.trim());
    }

    readInputFile(filename) {
        return this.readFileLines(path.join(__dirname, '..', 'inputs', filename));
    }
}

module.exports = new FileReader();
