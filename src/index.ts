import Game from "./game/models/game"
import { initWebSocketServer } from "./servers/websocket"
import { initAPI } from "./servers/api"

function main() {
    // API
    initAPI(8080)

    // Websockets
    initWebSocketServer(8081)

    const game = new Game()
}

main()