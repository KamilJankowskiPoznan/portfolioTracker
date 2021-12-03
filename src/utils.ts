export const convertLongNumberToString = (value: number): string => {
    if (value > 1000000000000) return Math.round(value / 10000000000) / 100 + "tln"
    if (value > 1000000000) return Math.round(value / 10000000) / 100 + "bln"
    if (value > 1000000) return Math.round(value / 10000) / 100 + "mln"
    return `${value}`;
}