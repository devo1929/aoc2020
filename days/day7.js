const BagReader = require('../classes/bag-reader');
const bagReader = new BagReader();

const allBags = bagReader.parseInputFile('input7.txt');

partOne();
partTwo();

function partOne() {

    const containingBags = findValidContainingBag('shiny gold', allBags);

    console.log('part one - containing bag count', containingBags.length);
}

function partTwo() {
    const numberOfBags = getNumberOfBagsIn('shiny gold', allBags);

    console.log('part two - number of bags', numberOfBags);
}

function getNumberOfBagsIn(targetBagName, allBags) {
    const bag = allBags.find(b => b.containingBag === targetBagName);

    return getNumberOfBagsInBag(bag, allBags);
}

function getNumberOfBagsInBag(bag, allBags) {
    return Object.keys(bag.containedBags).reduce((sum, bagKey) => {
        const cb = allBags.find(ab => ab.containingBag === bagKey);
        sum += bag.containedBags[bagKey] + bag.containedBags[bagKey] * getNumberOfBagsInBag(cb, allBags);

        return sum;
    }, 0)
}

function findValidContainingBag(targetBagName, allBags) {
    return allBags.filter(bag => bagContainsBag(bag, targetBagName, allBags))
}

function bagContainsBag(bag, targetBagName, allBags) {
    return Object.keys(bag.containedBags).indexOf(targetBagName) !== -1 ||
        Object.keys(bag.containedBags).map(bagName => allBags.find(b => b.containingBag === bagName))
            .some(bag => bagContainsBag(bag, targetBagName, allBags));
}
