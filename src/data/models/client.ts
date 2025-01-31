import { Column, HasOne, Model, Table } from "sequelize-typescript";
import Player from "./player";

@Table
export default class Client extends Model {
    @Column
    sessionId!: string

    @HasOne(() => Player)
    player!: Player
}