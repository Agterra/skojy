import { Request, Response } from "express"
import { LoginRequest } from "./types"
import { sequelize } from "../../../data/sequelize"
import Player from "../../../data/models/player"
import Client from "../../../data/models/client"

const playerRepository = sequelize.getRepository(Player)
const clientRepository = sequelize.getRepository(Client)

export const loginHomeHandler = async (req: Request, res: Response) => {
    res.render("index", { templateName: "login" })
}

export const loginHandler = async (req: Request, res: Response) => {
    const skojySessionId = req.cookies["skojy_session_id"]
    const request: LoginRequest = req.body
    const playerName = request.username
    if (!playerName || playerName.length == 0) {
        res.status(400).send("Bad request: Must provide a username")
        return
    }
    // Is this username already taken ?
    const existingPlayer = await clientRepository.findOne({ include: { model: playerRepository, where: { username: playerName } } })
    if (!existingPlayer) {
        // Does a client exists with this sessionId ?
        const existingClient = await clientRepository.findOne({ where: { skojySessionId } })
        if (existingClient) {
            // If yes, then we update the username for the player
            existingClient.player.username = playerName!
            await existingClient.save()
        } else {
            res.render("_rooms")
            return
        }
    } else {
        // If a player already exists, we check if there is a sessionId cookie, then compare it
        if (existingPlayer.skojySessionId == skojySessionId) {
            // If it's the same user, then we send a special status code to skip user creation
            res.status(302).render("_rooms")
            return
        }
    }
    res.status(400).send({ error: "Un joueur avec ce pseudo existe déjà" })
}