import express from 'express'
import { LoginRequest } from '../types/types'
import { sequelize } from '../../../data/sequelize'
import Player from '../../../data/models/player'
import Client from '../../../data/models/client'

const loginRouter = express.Router()
const playerRepository = sequelize.getRepository(Player)
const clientRepository = sequelize.getRepository(Client)

loginRouter.get('/', (req, res) => {
    res.render('index')
})

loginRouter.post('/login', async (req, res) => {
    console.log(req.ip)
    const request: LoginRequest = req.body
    const playerName = request.username
    const existingPlayer = await playerRepository.findOne({ where: { username: playerName } })
    if (existingPlayer != null) {
        res.send({ error: "Un joueur avec ce pseudo existe déjà" })
    } else {
        res.sendStatus(200)
    }
})

export {
    loginRouter
}