import { Column, HasMany, Model, Table } from "sequelize-typescript";
import Client from "./client";

@Table
export default class Room extends Model {
    @Column
    name!: String

    @HasMany(() => Client)
    players!: Client[]
}