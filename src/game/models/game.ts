import Config from "../config"
import shuffle from "../../utils/shuffle"
import Board from "./board"
import Card from "./card"
import Player from "./player"
import * as readline from 'node:readline'

export default class Game {
    public players: Player[] = []
    public deck: Card[]
    public discard: Card[] = []
    private turn: number = 0
    private currentPlayerIndex: number = 0

    constructor() {
        let cards = Card.generateCards()
        cards = shuffle(cards)
        const card = cards.pop()!
        card.revealCard()
        this.discard.push(card)
        this.deck = cards
    }
    /**
     * Legacy constructor
     */
    // constructor() {
    //     const playerNames = Array.from({ length: Config.PLAYER_COUNTS }, (_, i) => "Joueur " + String(i + 1))
    //     let cards = Card.generateCards()
    //     const boards = Array.from({ length: Config.PLAYER_COUNTS }, () => new Board([]))
    //     let drawCount = 0;
    //     while (drawCount < Config.BOARD_SIZE * Config.PLAYER_COUNTS) {
    //         const index = Math.floor(Math.random() * cards.length)
    //         boards[drawCount % Config.PLAYER_COUNTS]
    //             .addCard(cards.splice(index, 1)[0])
    //         drawCount++
    //     }
    //     const players = Array.from({ length: Config.PLAYER_COUNTS }, (_, i) => new Player(boards[i], playerNames[i]))
    //     this.players = players
    //     cards = shuffle(cards)
    //     const card = cards.pop()!
    //     card.revealCard()
    //     this.discard.push(card)
    //     this.deck = cards
    // }
    addPlayer(playerName: string): Error | undefined {
        if (this.players.filter((p) => p.name.toLowerCase() == playerName.toLowerCase()).length > 0) {
            return Error("player name is already taken")
        }
        const player = new Player(new Board([]), playerName);
        this.players.push(player);
        return;
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
            this.takeAction()
            // Notification des autres joueurs - Action
            const hasFinished = this.isLastTurn()
            // Notification des autres joueurs
        }
        return false
    }

    drawCard(): Card {
        if (this.deck.length == 0) throw new Error("Deck is empty !")
        return this.deck.pop()!
    }

    discardCard(card: Card): void {
        this.discard.push(card)
    }

    drawFromDiscard(): Card {
        if (this.discard.length == 0) throw new Error("Discard is empty !")
        return this.discard.pop()!
    }

    isLastTurn(): boolean {
        return this.currentPlayer().board.isFullyRevealed() || this.deck.length == 0
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

    takeAction(): void {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        rl.question("1. Piocher2. Prendre de la défausseChoix: ", (answer) => {
            switch (answer) {
                case "1":
                    const card = this.drawCard()
                    card.revealCard()
                    console.log("\nVous avez pioché: [" + card.getValue() + "]\n")
                    const action: number = +(prompt("\n1. L'échanger avec une de vos cartes\n2. La défausser\n\nChoix: ") || "-1")
                    break
                case "2":
                    break
                default:
                    break
            }
        })
    }

    toString(): string {
        return this.players.map(p => p.name + ":\n" + p.board.toString()).join("\n")
    }
}