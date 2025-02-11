import express from 'express'
import { loginHandler, loginHomeHandler } from './requests'

const loginRouter = express.Router()

loginRouter.get('/', loginHomeHandler)
loginRouter.post('/login', loginHandler)

export {
    loginRouter
}