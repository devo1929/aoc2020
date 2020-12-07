class Bag {
    static fullRegex = /^([\w\s]+) bags contain ([\w\s,]+)\./;

    static childBagRegex = /^(\d)\s([\w\s]+)\sbag[s]*$/;
    
    constructor() {
        this.containingBag = null;
        
        this.containedBags = [];
    }
    
    static parse(line) {
        const bag = new Bag();
        
        const parsed = this.fullRegex.exec(line);
        bag.containingBag = parsed[1];
        
        if(parsed[2] === 'no other bags') {
            return bag;
        }

        bag.containedBags =
            parsed[2].split(',').reduce((bags, p) => {
                p = this.childBagRegex.exec(p.trim());

                bags[p[2]] = parseInt(p[1]);
                return bags;
            }, {});

        return bag;
    }
}

module.exports = Bag;
