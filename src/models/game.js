const { Config } = require("../config")
const { Board } = require("./board")
const { Card } = require("./card")
const { Player } = require("./player")

class Game {
    players = []
    deck = []
    discard = []
    turn = 0
    currentPlayer = 0

    constructor() {
        const playerNames = Array.from({ length: Config.PLAYER_COUNTS }, (_, i) => "Joueur " + String(i + 1))
        const cards = Card.generateCards(Config.DISTRIBUTION)
        const boards = Array.from({ length: Config.PLAYER_COUNTS }, () => new Board([]))
        let drawCount = 0;
        while (drawCount < Config.BOARD_SIZE * Config.PLAYER_COUNTS) {
            const index = Math.floor(Math.random() * cards.length)
            boards[drawCount % Config.PLAYER_COUNTS]
                .addCard(cards[index])
            cards.splice(index, 1)
            drawCount++
        }
        const players = Array.from({ length: Config.PLAYER_COUNTS }, (_, i) => new Player(boards[i], playerNames[i]))

        this.players = players
        this.deck = cards
    }
}

exports.Game = Game