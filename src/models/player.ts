import Board from "./board"

export default class Player {
    public board: Board
    public name: string

    constructor(board: Board, name: string) {
        this.board = board
        this.name = name
    }
}