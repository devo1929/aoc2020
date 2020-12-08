/**
 * @property instructionType {BootCodeInstructionTypes}
 * @property value {number}
 */
class BootCodeInstruction {
    static instructionRegex = /(acc|jmp|nop)\s([+\-])(\d+)/

    constructor(instructionType, direction, value) {
        this.instructionType = instructionType;
        this.direction = direction;
        this.value = parseInt(value);
    }

    isAccumulator() {
        return this.instructionType === BootCodeInstructionTypes.Acc;
    }

    isJump() {
        return this.instructionType === BootCodeInstructionTypes.Jmp;
    }

    isNoop() {
        return this.instructionType === BootCodeInstructionTypes.Nop;
    }

    isPositive() {
        return this.direction === BootCodeInstructionDirection.Positive;
    }

    isNegative() {
        return this.direction === BootCodeInstructionDirection.Negative;
    }

    clone() {
        return new BootCodeInstruction(this.instructionType, this.direction, this.value);
    }

    static fromInputLine(line) {
        const instructionParts = this.instructionRegex.exec(line);

        if (instructionParts === null) {
            return null;
        }

        return new BootCodeInstruction(instructionParts[1], instructionParts[2], instructionParts[3]);
    }
}

class BootCodeInstructionTypes {
    static Acc = 'acc';
    static Jmp = 'jmp';
    static Nop = 'nop';
}

class BootCodeInstructionDirection {
    static Positive = '+';
    static Negative = '-';
}

module.exports = {BootCodeInstruction, BootCodeInstructionTypes, BootCodeInstructionDirection};
