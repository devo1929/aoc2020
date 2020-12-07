const fileReader = require('../classes/file-reader');
const _ = require('lodash');

const inputLines = fileReader.readInputFile('input6.txt');

partOne();
partTwo();

function partOne() {
    const groupAnswers = createUniqGroupAnswers(inputLines);

    const sum = groupAnswers.reduce((_sum, groupAnswer) => {
        return _sum + groupAnswer.length;
    }, 0);

    console.log(sum);
}

function partTwo() {

    const groups = createGroups(inputLines);

    const groupSums = groups.reduce((_groupSums, group) => {
        const groupUnique = _.uniq(group.reduce((_answers, person) => {
            _answers.push(...person.split('').filter(answer => group.every(p => p.indexOf(answer) !== -1)));
            return _answers
        }, []));

        return _groupSums + groupUnique.length;
    }, 0);

    console.log(groupSums);
}


function createUniqGroupAnswers(inputLines) {

    const groups = createGroups(inputLines);

    return groups.reduce((_groupAnswers, group) => {
        _groupAnswers.push(_.uniq(group.reduce((_answers, person) => {
            _answers.push(...person.split(''));
            return _answers;
        }, [])));

        return _groupAnswers;
    }, []);
}


function createGroups(inputLines) {
    const groups = [];

    let group = [];
    inputLines.forEach(line => {
        line = line.trim();
        if (!line.length) {
            groups.push(group);
            group = [];
            return;
        }
        group.push(line);
    });
    groups.push(group);

    return groups;
}


