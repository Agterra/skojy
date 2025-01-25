import Board from "./board"
import Card from "./card"

export default class Player {
    public board: Board
    public name: string

    constructor(board: Board, name: string) {
        this.board = board
        this.name = name
    }

    replaceCard(newCard: Card, index: number): Card {
        return this.board.replaceCard(newCard, index)
    }

    revealCard(index: number): void {
        this.board.revealCard(index)
    }
}