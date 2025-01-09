class Card {
    hidden = true

    constructor(value) {
        this.value = value
    }

    static generateCards(distribution) {
        const cards = []
        Object.keys(distribution).forEach(value => {
            const count = distribution[value];
            for (let i = 0; i < count; i++) {
                cards.push(new Card(value))
            }
        });
        return cards
    }

    /**
     * 
     * @returns Value of the card, null if hidden
     */
    getValue() {
        if (this.hidden) {
            return null
        }

        return this.value
    }

    returnCard() {
        this.hidden = false
    }
}

exports.Card = Card