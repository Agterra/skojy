import { WebSocketServer } from "ws"

export function initWebSocketServer(port: number) {
    // Websocket
    const wss = new WebSocketServer({ port })
    console.log("Web Socket Server started on port ", port)

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