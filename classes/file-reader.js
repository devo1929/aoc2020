const fs = require('fs');
const path = require('path');


class FileReader {
    readFileLines(path, split = true) {
        const contents = fs.readFileSync(path).toString().trim();
        if(!split) {
            return contents;
        }

        return contents.split('\n').map(s => s.trim());
    }

    readInputFile(filename, split = true) {
        return this.readFileLines(path.join(__dirname, '..', 'inputs', filename), split);
    }
}

module.exports = new FileReader();
