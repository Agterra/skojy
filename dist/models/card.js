"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
class Card {
    constructor(value) {
        this.revealed = false;
        this.value = value;
    }
    static generateCards() {
        const distribution = config_1.default.DISTRIBUTION;
        const cards = [];
        for (let [value, count] of distribution) {
            for (let i = 0; i < count; i++) {
                cards.push(new Card(value));
            }
        }
        return cards;
    }
    getValue() {
        if (this.revealed) {
            return this.value;
        }
        return undefined;
    }
    revealCard() {
        this.revealed = true;
    }
}
exports.default = Card;
