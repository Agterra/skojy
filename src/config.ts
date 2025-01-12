export default class Config {
    static MAX = 150
    static BOARD_SIZE = 12
    static PLAYER_COUNTS = 5
    static DISTRIBUTION = new Map<number, number>([
        [-2, 5],
        [0, 15],
        [-1, 10],
        [1, 10],
        [2, 10],
        [3, 10],
        [4, 10],
        [5, 10],
        [6, 10],
        [7, 10],
        [8, 10],
        [9, 10],
        [10, 10],
        [11, 10],
        [12, 10]
    ])
}