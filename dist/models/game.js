"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const shuffle_1 = __importDefault(require("../utils/shuffle"));
const board_1 = __importDefault(require("./board"));
const card_1 = __importDefault(require("./card"));
const player_1 = __importDefault(require("./player"));
class Game {
    constructor() {
        this.discard = [];
        this.turn = 0;
        this.currentPlayerIndex = 0;
        const playerNames = Array.from({ length: config_1.default.PLAYER_COUNTS }, (_, i) => "Joueur " + String(i + 1));
        let cards = card_1.default.generateCards();
        const boards = Array.from({ length: config_1.default.PLAYER_COUNTS }, () => new board_1.default([]));
        let drawCount = 0;
        while (drawCount < config_1.default.BOARD_SIZE * config_1.default.PLAYER_COUNTS) {
            const index = Math.floor(Math.random() * cards.length);
            boards[drawCount % config_1.default.PLAYER_COUNTS]
                .addCard(cards.splice(index, 1)[0]);
            drawCount++;
        }
        const players = Array.from({ length: config_1.default.PLAYER_COUNTS }, (_, i) => new player_1.default(boards[i], playerNames[i]));
        this.players = players;
        cards = (0, shuffle_1.default)(cards);
        const card = cards.pop();
        card.revealCard();
        this.discard.push(card);
        this.deck = cards;
    }
    currentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
    gameLoop() {
        console.log(this.getTurnInfo());
        for (this.currentPlayerIndex = 0; this.currentPlayerIndex < this.players.length; this.currentPlayerIndex++) {
            console.log(this.getPlayerInfo());
            console.log(this.getPlayerBoardInfo());
            console.log(this.getGameInfo());
            // Notification des autres joueurs - Infos
            // Action de selection du joueur
            // Notification des autres joueurs - Action
            const hasFinished = this.currentPlayer().board.isFullyRevealed();
            // Notification des autres joueurs
        }
        return false;
    }
    getTurnInfo() {
        return "Tour " + this.turn + "\n";
    }
    getPlayerInfo() {
        return "C'est à " + this.currentPlayer().name + " de jouer\n";
    }
    getPlayerBoardInfo() {
        return this.currentPlayer().board.toString();
    }
    getGameInfo() {
        return "Pioche: [X] (" + this.deck.length + ")\nDéfausse: [" + this.discard.slice(-1)[0].getValue() + "]\n";
    }
    toString() {
        return this.players.map(p => p.name + ":\n" + p.board.toString()).join("\n");
    }
}
exports.default = Game;
