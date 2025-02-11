import { BelongsTo, Column, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import Player from "./player";
import Room from "./room";

@Table
export default class Client extends Model {
    @Column
    skojySessionId!: string

    @HasOne(() => Player)
    player!: Player

    @ForeignKey(() => Room)
    @Column
    roomId!: number

    @BelongsTo(() => Room)
    room!: Room
}