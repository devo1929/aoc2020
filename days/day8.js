const BootCodeInstruction = require('../classes/boot-code-instruction').BootCodeInstruction;
const BootCodeInstructionTypes = require('../classes/boot-code-instruction').BootCodeInstructionTypes;

const fileReader = require('../classes/file-reader');

const instructions = fileReader
    .readInputFile('input8.txt')
    .map(i => BootCodeInstruction.fromInputLine(i));


partOne();
partTwo();

function partOne() {
    console.log('part one');
    runInstructions(instructions);
}

function partTwo() {
    console.log('part two');
    let changeIndex = 0;
    while (runInstructions(changeInstruction(instructions, changeIndex++)) === false) ;
}

function changeInstruction(_instructions, index) {
    const copy = _instructions.map(i => i.clone());

    for (let i = index; i < copy.length; i++) {
        const instruction = copy[i];
        if (instruction.isJump()) {
            copy[i].instructionType = BootCodeInstructionTypes.Nop;
            return copy;
        }
        if (instruction.isNoop()) {
            copy[i].instructionType = BootCodeInstructionTypes.Jmp;
            return copy;
        }
    }

    return copy;
}

function runInstructions(_instructions) {
    let accumulator = 0;

    const executionMap = {};

    for (let i = 0; i < _instructions.length;) {

        if (executionMap[i]) {
            console.log('repeated execution accumulator', accumulator);
            return false;
        }
        executionMap[i] = true;
        const instruction = _instructions[i];
        const value = (instruction.isPositive() ? instruction.value : -instruction.value);

        switch (instruction.instructionType) {
            case BootCodeInstructionTypes.Acc:
                accumulator += value;
                i++;
                break;
            case BootCodeInstructionTypes.Jmp:
                i += value;
                break;
            default:
                i++;
                break;
        }
    }

    console.log('program completed!', accumulator);

    return true;
}
