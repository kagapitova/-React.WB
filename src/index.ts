function convertFromDecimal(value: number, base: number): string {
    return value.toString(base).toUpperCase();
}

function convertToDecimal(value: string, base: number): number {
    return parseInt(value, base);
}
