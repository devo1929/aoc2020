const fileReader = require('./file-reader');
const Bag = require('./bag');

class BagReader {

    constructor() {
        this.fullRegex = /^([\w\s]+) bags contain ([\w\s,]+)\./;
    }


    parseInputFile(filename) {
        const lines = fileReader.readInputFile(filename);

        const bags = lines.map(line => Bag.parse(line));

        return bags;
    }
}

module.exports = BagReader;
