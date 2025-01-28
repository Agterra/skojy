import "reflect-metadata"
import Game from "./game/models/game"
import { initWebSocketServer } from "./servers/websocket"
import { initAPI } from "./servers/api"
import Player from "./data/models/player"
import { sequelize } from "./data/sequelize"
import Client from "./data/models/client"

async function main() {
    await sequelize.sync({ force: true })

    const client = await Client.create({
        ip: '123.123.123.123.',
        player: {
            username: 'gagagougoug'
        }
    }, {
        include: [Player]
    })

    await Player.findAll().then((players) => {
        console.log(JSON.stringify(players))
    })

    await Client.findAll({ include: [Player] }).then((players) => {
        console.log(JSON.stringify(players))
    })
    // DB
    // await initDatabase()

    // const player = new Player({
    //     username: "gagagougou"
    // })
    // await player.save()

    // const test = await Client.findAll({ include: Player })
    // console.log(JSON.stringify(test))

    // API
    initAPI(8080)

    // Websockets
    initWebSocketServer(8081)

    const game = new Game()
}

main()