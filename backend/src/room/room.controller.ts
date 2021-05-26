import { Controller, Get, Post } from "@nestjs/common";
import { RoomService } from "./room.service";
import { v1 as uuidv1 } from 'uuid'

@Controller('room')
export class RoomController {
    
    constructor(private readonly roomService: RoomService) {}

    @Post()
    async createRoom(): Promise<string> {
        return await this.roomService.createRoom();
    }


}