import { Controller, Get } from "@nestjs/common";
import { RoomService } from "./room.service";

@Controller('Room')
export class RoomController {
    
    constructor(private readonly roomService: RoomService) {}


}