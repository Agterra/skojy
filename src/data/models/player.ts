import { BelongsTo, Column, ForeignKey, Model, Table, Unique } from "sequelize-typescript";
import Client from "./client";

@Table
export default class Player extends Model {
    @Unique
    @Column
    username!: string

    @ForeignKey(() => Client)
    @Column
    clientId!: number

    @BelongsTo(() => Client)
    client!: Client
}