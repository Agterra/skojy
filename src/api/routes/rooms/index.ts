import express from 'express'
import { getRooms } from './requests'

const roomsRouter = express.Router()

roomsRouter.get('/', getRooms)

export {
    roomsRouter
}