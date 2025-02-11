import { WebSocket, WebSocketServer } from "ws"
import { CreateUserBody, WebSocketMessage } from "./actions"
import { sequelize } from "../../data/sequelize"
import Client from "../../data/models/client"
import Player from "../../data/models/player"
import { v4 as uuid } from 'uuid'

const clientRepository = sequelize.getRepository(Client)
const playerRepository = sequelize.getRepository(Player)

export default class WebSocketService {
    private static instance: WebSocketService

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService(8081)
        }
        return WebSocketService.instance
    }

    private wss: WebSocketServer

    constructor(port: number) {
        this.wss = new WebSocketServer({ port })
        console.log("Web Socket Server started on port :", port)

        this.wss.on('connection', (ws, req) => {
            // This block is a client session
            console.log("Client connected")
            ws.send(JSON.stringify({ action: 'unique_id', body: { id: uuid() } }), { binary: true })

            // Send game data

            ws.on('error', console.error)

            ws.on('message', async function message(data) {
                const message: WebSocketMessage = JSON.parse(data.toString());
                switch (message.action) {
                    case 'create_user':
                        await createUser(message.id, message.body)
                        break
                    default:
                        break
                }
            });

            ws.on('close', () => {
                console.log("Client disconnected")
            })
            // End of client sessions
        })
    }

}

async function createUser(sessionId: string, body: CreateUserBody) {
    if (body.username.length === 0) return
    await clientRepository.create({
        sessionId,
        player: {
            username: body.username
        }
    }, { include: [playerRepository], })
        .catch((reason) => {
            console.log(reason.errors)
        })

    const res = await clientRepository.findAll({ include: [playerRepository] })
    console.log(JSON.stringify(res, null, 2))
}

export const webSockerService = WebSocketService.getInstance()