const colorIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function generateRandomColorId(): string {
    return colorIds[Math.floor(Math.random() * colorIds.length)].toString();
}