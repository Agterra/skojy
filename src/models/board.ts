import Card from "./card"

export default class Board {
    private columns: number
    private rows: number
    private cards: Card[] = []

    constructor(cards: Card[], columns: number = 4, rows: number = 3) {
        this.cards = cards
        this.columns = columns
        this.rows = rows
    }

    addCard(card: Card): void {
        this.cards.push(card)
    }

    removeCard(index: number): void {
        this.cards.splice(index, 1)
    }

    revealCard(index: number): void {
        this.cards[index].revealCard()
    }

    isFullyRevealed(): boolean {
        return this.cards.reduce((allRevealed, v) => allRevealed && v.revealed, true)
    }

    /**
     * Checks if a column is complete
     * @param index index of the column
     * @returns true if all cards are the same in the column
     */
    isColumnComplete(index: number): boolean {
        const values = new Set<Number>()
        for (let i = 0; i < this.rows; i++) {
            const value = this.cards[index + i * this.rows].getValue()
            if (value == undefined) return false
            values.add(value)
        }
        // if the set is a size of 1, it means all cards have the same value
        return values.size == 1
    }

    /**
     * Checks each columns and remove the completed ones
     */
    updateColumns(): void {
        const newBoard: (Card | null)[] = new Array<Card | null>(this.cards.length).fill(null)
        const completedColumns: number[] = []
        for (let i = 0; i < this.columns; i++) {
            const complete = this.isColumnComplete(i)
            if (complete) completedColumns.push(i)
        }
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (completedColumns.includes(i) == false) {
                    const index = i + j * this.rows
                    newBoard[index] = this.cards[index]
                }
            }
        }
        this.columns = this.columns - completedColumns.length
        this.cards = newBoard.filter(e => e != null)
    }

    toString(): string {
        return this.cards.map((e, i) => {
            let value = "[" + String(e.getValue() || "X") + "]"
            if (i % this.columns == this.columns - 1) value += "\n"
            return value
        }).join("")
    }
}