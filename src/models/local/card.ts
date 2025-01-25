import Config from "../../config"

export default class Card {
    public revealed: boolean = false
    private value?: number

    constructor(value: number) {
        this.value = value
    }

    static generateCards(): Card[] {
        const distribution = Config.DISTRIBUTION
        const cards: Card[] = []
        for (let [value, count] of distribution) {
            for (let i = 0; i < count; i++) {
                cards.push(new Card(value))
            }
        }
        return cards
    }

    getValue(): number | undefined {
        if (this.revealed) {
            return this.value
        }

        return undefined
    }

    revealCard(): void {
        this.revealed = true
    }
}