"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = shuffle;
function shuffle(array) {
    const shuffled = [...array];
    for (let i = 0; i < shuffled.length; i++) {
        const randomIndex = Math.floor(Math.random() * shuffled.length);
        const tmp = shuffled[i];
        shuffled[i] = shuffled[randomIndex];
        shuffled[randomIndex] = tmp;
    }
    return shuffled;
}
