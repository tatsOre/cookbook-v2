/** Int from interval, min and max included */
export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
