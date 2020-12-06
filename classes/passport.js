class Passport {

    constructor() {
        this.rawPasswport = null;
        this.birthYear = null;
        this.issueYear = null;
        this.expirationYear = null;
        this.height = null;
        this.hairColor = null;
        this.eyeColor = null;
        this.passportId = null;
        this.countryId = null;

        this.heightRegex = /^(\d+)(cm|in)$/;
        this.hairColorRegex = /^#[0-9a-f]{6}$/;
        this.eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
        this.passportIdRegex = /^\d{9}$/;
    }

    isValidPartOne() {
        return this.birthYear !== null &&
            this.issueYear !== null &&
            this.expirationYear !== null &&
            this.height !== null &&
            this.hairColor !== null &&
            this.eyeColor !== null &&
            this.passportId !== null;
    }

    isValidPartTwo() {
        return this.isValidBirthYear() &&
            this.isValidIssueYear() &&
            this.isValidExpirationYear() &&
            this.isValidHeight() &&
            this.isValidHairColor() &&
            this.isValidEyeColor() &&
            this.isValidPassportId();
    }

    isValidBirthYear() {
        if (this.birthYear === null) {
            return false;
        }
        const birthYear = parseInt(this.birthYear);

        return birthYear >= 1920 &&
            birthYear <= 2002;
    }

    isValidIssueYear() {
        if (this.issueYear === null) {
            return false;
        }

        const issueYear = parseInt(this.issueYear);

        return issueYear >= 2010 &&
            issueYear <= 2020;
    }

    isValidExpirationYear() {
        if (this.expirationYear === null) {
            return false;
        }

        const expirationYear = parseInt(this.expirationYear);

        return expirationYear >= 2020 &&
            expirationYear <= 2030;
    }

    isValidHeight() {
        if (this.height === null) {
            return false;
        }

        const height = this.heightRegex.exec(this.height);

        if (height === null) {
            return false;
        }

        switch (height[2].toLowerCase()) {
            case 'cm':
                return height[1] >= 150 && height[1] <= 193;
            case 'in':
                return height[1] >= 59 && height[1] <= 76;
            default:
                return false;
        }
    }

    isValidHairColor() {
        if (this.hairColor === null) {
            return false;
        }

        return this.hairColorRegex.test(this.hairColor);
    }

    isValidEyeColor() {
        if (this.eyeColor === null) {
            return false;
        }

        return this.eyeColors.indexOf(this.eyeColor) !== -1;
    }

    isValidPassportId() {
        if (this.passportId === null) {
            return false;
        }

        return this.passportIdRegex.test(this.passportId);
    }

    parseRawPassport(rawPassport) {
        this.rawPasswport = rawPassport;

        const properties = rawPassport.split(/\s+/);

        for (let i = 0; i < properties.length; i++) {
            const property = properties[i].split(':');

            this.applyRawProperty(property[0], property[1]);
        }
    }

    static fromRawPassport(rawPassport) {
        const passport = new Passport();
        passport.parseRawPassport(rawPassport);
        return passport;
    }

    /**
     * @param name string
     * @param value string
     */
    applyRawProperty(name, value) {
        switch (name) {
            case 'byr':
                this.birthYear = value;
                return;
            case 'iyr':
                this.issueYear = value;
                return;
            case 'eyr':
                this.expirationYear = value;
                return;
            case 'hgt':
                this.height = value;
                return;
            case 'hcl':
                this.hairColor = value;
                return;
            case 'ecl':
                this.eyeColor = value;
                return;
            case 'pid':
                this.passportId = value;
                return;
            case 'cid':
                this.countryId = value;
                return;
        }
    }
}

module.exports = Passport;
