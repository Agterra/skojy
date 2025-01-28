import express from 'express'
import { LoginRequest } from '../types/types'

const loginRouter = express.Router()

loginRouter.get('/', (req, res) => {
    res.render('index')
})

loginRouter.post('/login', (req, res) => {
    const request: LoginRequest = req.body
    res.send(request.username)
})

export {
    loginRouter
}