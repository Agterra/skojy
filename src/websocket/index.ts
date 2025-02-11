import { WebSocket, WebSocketServer } from "ws"
import { CreateUserBody, WebSocketMessage } from "./actions"
import { sequelize } from "../data/sequelize"
import Client from "../data/models/client"
import Player from "../data/models/player"
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
            // We create a unique identifier for the client when it connects
            ws.send(JSON.stringify({ action: 'unique_id', body: { id: uuid() } }), { binary: true })

            // Send game data

            ws.on('error', console.error)

            ws.on('message', async function message(data) {
                const message: WebSocketMessage = JSON.parse(data.toString());
                console.log(message)
                switch (message.action) {
                    case 'create_user':
                        await createUser(message.id, message.body)
                        break
                    default:
                        break
                }
            });

            ws.on('close', async () => {
                console.log("Client disconnected")
            })
            // End of client sessions
        })
    }

}

const parseCookies = (rawCookies: string) => {
    const chunks = rawCookies.split(";")
    const cookies: { [id: string]: string } = {}
    chunks.forEach((chunk: string) => {
        const parts = chunk.split("=")
        cookies[parts[0]] = parts[1]
    })
    return cookies
}

async function deleteUser(skojySessionId: string) {
    const rows = await clientRepository.destroy({ where: { skojySessionId } })
    console.log("Deleted ", rows, " rows.")
}

async function createUser(skojySessionId: string, body: CreateUserBody) {
    if (body.username.length === 0) return
    await clientRepository.create({
        skojySessionId,
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