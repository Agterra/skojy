import { Sequelize } from "sequelize-typescript"
import Player from "./models/player"
import Client from "./models/client"

export const sequelize = new Sequelize({
    database: 'skojy',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: ':memory:',
    repositoryMode: true,
    models: [Client, Player]
})
