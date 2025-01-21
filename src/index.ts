import Client from "./models/local/client";
import Game from "./models/local/game"
import { WebSocketServer } from 'ws';

function main() {
    const game = new Game()
    //
    const wss = new WebSocketServer({ port: 8080 })
    console.log("Web Socket created on port 8080")

    wss.on('connection', (ws, req) => {
        // This block is a client session
        console.log("Client connected")

        // Create player and client object

        // Send game data

        ws.on('error', console.error)

        ws.on('message', function message(data) {
            console.log(JSON.parse(data.toString()));
        });

        ws.on('close', () => {
            console.log("Client disconnected")
        })
        // End of client sessions
    })
}

main()