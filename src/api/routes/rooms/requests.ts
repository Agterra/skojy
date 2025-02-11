import { Request, Response } from "express";
import { sequelize } from "../../../data/sequelize";
import Room from "../../../data/models/room";
import Client from "../../../data/models/client";

const roomsRepository = sequelize.getRepository(Room)
const clientRepository = sequelize.getRepository(Client)

export const getRooms = async (req: Request, res: Response) => {
    const rooms = await roomsRepository.findAll({ include: [clientRepository] })
    console.log(JSON.stringify(rooms))
    res.render("_rooms", { rooms: [] })
}