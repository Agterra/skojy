class Board {
    constructor(cards) {
        this.cards = cards
    }

    addCard(card) {
        this.cards.push(card)
    }

    removeCard(index) {
        this.cards.splice(index, 1)
    }
    
    toString() {
        return this.cards.map(e => e.getValue())
    }
}

exports.Board = Board