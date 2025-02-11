import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import path from 'node:path'
import { colorForCode, terminalColors } from '../utils/colors'
import { loginRouter } from './routes/login'
import { roomsRouter } from './routes/rooms'
import cookieParser from 'cookie-parser'

export default class APIService {
    private static instance: APIService

    public static getInstance(): APIService {
        if (!APIService.instance) {
            APIService.instance = new APIService(8080)
        }

        return APIService.instance
    }

    constructor(port: number) {
        const app = express()
        app.use(logger)
        app.use(cookieParser())
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(express.static(path.resolve(__dirname, 'assets')))
        app.set("view engine", "pug")
        app.set("views", path.join(__dirname, "views"))

        // Routes
        app.use('/', loginRouter)
        app.use('/rooms', roomsRouter)

        app.listen(port, () => {
            console.log("API Server started on port ", port)
        })
    }

}

export const apiService = APIService.getInstance()

function logger(req: Request, res: Response, next: NextFunction) {
    res.on('close', () => {
        const time = new Date()
        const color = colorForCode(res.statusCode)
        console.log(time, "[", color, res.statusCode, terminalColors.Reset, "]:", req.url)
    })
    next()
}

