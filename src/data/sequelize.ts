import { Sequelize } from "sequelize-typescript"
import Player from "./models/player"
import Client from "./models/client"
import Room from "./models/room"

export const sequelize = new Sequelize({
    database: 'skojy',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'skojy.sqlite',
    repositoryMode: true,
    models: [
        Client,
        Player,
        Room,
    ]
})
