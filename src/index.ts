import "reflect-metadata"
import Game from "./game/models/game"
import { sequelize } from "./data/sequelize"
import { webSockerService } from "./servers/websocket"
import { apiService } from "./servers/api"

function initServices() {
    webSockerService
    apiService
}

async function main() {
    await sequelize.sync()
    initServices()

    const game = new Game()
}

main()