import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import Client from "./client";

@Table
export default class Player extends Model {
    @Column
    username!: string

    @ForeignKey(() => Client)
    @Column
    clientId!: number

    @BelongsTo(() => Client)
    client!: Client
}