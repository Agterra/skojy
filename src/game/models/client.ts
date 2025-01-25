import Player from './player';

export default class Client {
    player: Player
    address: string

    constructor(player: Player, address: string) {
        this.player = player
        this.address = address
    }
}