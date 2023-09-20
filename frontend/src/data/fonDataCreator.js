import fs from 'fs';

const randomInt = (lower, upper) =>
    Math.floor(Math.random() * (upper - lower + 1)) + lower;

function randomCode(letterLength, numberLength) {
    const chars = 'ABCDEFGHIJKLMNOPRQSTUVYZ';
    const numbers = '0123456789';

    let code = '';
    for (let _ = 0; _ < letterLength; _++) {
        code += chars.charAt(randomInt(0, 23));
    }

    for (let _ = 0; _ < numberLength; _++) {
        code += numbers.charAt(randomInt(0, 9));
    }

    return code;
}

const randomFonCode = () => randomCode(3, 0);
const randomToMemberCode = () => randomCode(3, 3);

function randomCurrency() {
    return ['TL', 'USD', 'EUR'][randomInt(0, 2)];
}

const randomValorSuspension = () => randomInt(0, 2);
const randomFonCount = () => randomInt(100, 3000);
const randomFonPrice = () => Math.random() * 100 + 1;

function create(count) {
    const fons = [];

    for (let _ = 0; _ < count; _++) {
        const fonCode = randomFonCode();
        const toMemberCode = randomToMemberCode();

        fons.push({
            code: fonCode,
            explanation: fonCode,
            toMemberCode: toMemberCode,
            toMemberExplanation: toMemberCode,
            currency: randomCurrency(),
            valorSuspension: randomValorSuspension(),
            count: randomFonCount(),
            price: randomFonPrice(),
        });
    }

    const fonsJson = JSON.stringify(fons, null, 4);
    fs.writeFile('fons.json', fonsJson, () => {});
}

create(100);
