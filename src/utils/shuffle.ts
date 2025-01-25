export default function shuffle<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = 0; i < shuffled.length; i++) {
        const randomIndex = Math.floor(Math.random() * shuffled.length)
        const tmp = shuffled[i]
        shuffled[i] = shuffled[randomIndex]
        shuffled[randomIndex] = tmp
    }
    return shuffled
}