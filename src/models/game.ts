import Config from "../config"
import shuffle from "../utils/shuffle"
import Board from "./board"
import Card from "./card"
import Player from "./player"

export default class Game {
    public players: Player[]
    public deck: Card[]
    public discard: Card[] = []
    private turn: number = 0
    private currentPlayerIndex: number = 0

    constructor() {
        const playerNames = Array.from({ length: Config.PLAYER_COUNTS }, (_, i) => "Joueur " + String(i + 1))
        let cards = Card.generateCards()
        const boards = Array.from({ length: Config.PLAYER_COUNTS }, () => new Board([]))
        let drawCount = 0;
        while (drawCount < Config.BOARD_SIZE * Config.PLAYER_COUNTS) {
            const index = Math.floor(Math.random() * cards.length)
            boards[drawCount % Config.PLAYER_COUNTS]
                .addCard(cards.splice(index, 1)[0])
            drawCount++
        }
        const players = Array.from({ length: Config.PLAYER_COUNTS }, (_, i) => new Player(boards[i], playerNames[i]))
        this.players = players
        cards = shuffle(cards)
        const card = cards.pop()!
        card.revealCard()
        this.discard.push(card)
        this.deck = cards
    }

    currentPlayer(): Player {
        return this.players[this.currentPlayerIndex]
    }

    gameLoop(): boolean {
        console.log(this.getTurnInfo())
        for (this.currentPlayerIndex = 0; this.currentPlayerIndex < this.players.length; this.currentPlayerIndex++) {
            console.log(this.getPlayerInfo())
            console.log(this.getPlayerBoardInfo())
            console.log(this.getGameInfo())
            // Notification des autres joueurs - Infos
            // Action de selection du joueur
            // Notification des autres joueurs - Action
            const hasFinished = this.currentPlayer().board.isFullyRevealed()
            // Notification des autres joueurs
        }
        return false
    }

    getTurnInfo(): string {
        return "Tour " + this.turn + "\n"
    }

    getPlayerInfo(): string {
        return "C'est à " + this.currentPlayer().name + " de jouer\n"
    }

    getPlayerBoardInfo(): string {
        return this.currentPlayer().board.toString()
    }

    getGameInfo(): string {
        return "Pioche: [X] (" + this.deck.length + ")\nDéfausse: [" + this.discard.slice(-1)[0].getValue() + "]\n"
    }

    toString(): string {
        return this.players.map(p => p.name + ":\n" + p.board.toString()).join("\n")
    }
}