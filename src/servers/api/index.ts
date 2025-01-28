import express, { NextFunction, Request, Response } from 'express'
import pug from 'pug'
import bodyParser from 'body-parser'
import { loginRouter } from './routes/login'
import path from 'node:path'
import { colorForCode, terminalColors } from '../../utils/colors'

function logger(req: Request, res: Response, next: NextFunction) {
    res.on('close', () => {
        const time = new Date()
        const color = colorForCode(res.statusCode)
        console.log(time, "[", color, res.statusCode, terminalColors.Reset, "]:", req.url)
    })
    next()
}

export function initAPI(port: number) {
    const app = express()
    app.use(logger)
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static(path.resolve(__dirname, 'assets')))
    app.set("view engine", "pug")
    app.set("views", path.join(__dirname, "templates"))

    // Routes
    app.use('/', loginRouter)

    app.listen(port, () => {
        console.log("API Server started on port ", port)
    })
}