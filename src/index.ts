function convertFromDecimal(value: number, base: number): string {
    return value.toString(base).toUpperCase();
}

function convertToDecimal(value: string, base: number): number {
    return parseInt(value, base);
}

type Base = 2 | 10 | 16; // 8-ричную не указали в задании

function calculate(
    num1: string,
    num2: string,
    base: Base,
    operation: (a: number, b: number) => number
): string {
    const decimalNum1 = convertToDecimal(num1, base);
    const decimalNum2 = convertToDecimal(num2, base);
    
    const result = operation(decimalNum1, decimalNum2);
    
    return convertFromDecimal(result, base);
}

const add = (a: number, b: number): number => a + b;
const subtract = (a: number, b: number): number => a - b;
const multiply = (a: number, b: number): number => a * b;
const divide = (a: number, b: number): number => Math.floor(a / b);

// Пример с двоичной системой
const num1Binary = "1010";
const num2Binary = "1111";
const baseBinary: Base = 2;

console.log("Сложение (двоичная):", calculate(num1Binary, num2Binary, baseBinary, add));
console.log("Вычитание (двоичная):", calculate(num1Binary, num2Binary, baseBinary, subtract));
console.log("Умножение (двоичная):", calculate(num1Binary, num2Binary, baseBinary, multiply));
console.log("Деление (двоичная):", calculate(num1Binary, num2Binary, baseBinary, divide));

// Пример с десятичной системой
const num1Decimal = "25";
const num2Decimal = "10";
const baseDecimal: Base = 10;

console.log("Сложение (десятичная):", calculate(num1Decimal, num2Decimal, baseDecimal, add));
console.log("Вычитание (десятичная):", calculate(num1Decimal, num2Decimal, baseDecimal, subtract));
console.log("Умножение (десятичная):", calculate(num1Decimal, num2Decimal, baseDecimal, multiply));
console.log("Деление (десятичная):", calculate(num1Decimal, num2Decimal, baseDecimal, divide));

// Пример с шестнадцатеричной системой
const num1Hex = "A";
const num2Hex = "F";
const baseHex: Base = 16;

console.log("Сложение (шестнадцатеричная):", calculate(num1Hex, num2Hex, baseHex, add));
console.log("Вычитание (шестнадцатеричная):", calculate(num1Hex, num2Hex, baseHex, subtract));
console.log("Умножение (шестнадцатеричная):", calculate(num1Hex, num2Hex, baseHex, multiply));
console.log("Деление (шестнадцатеричная):", calculate(num1Hex, num2Hex, baseHex, divide));
