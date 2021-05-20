import { Module } from "@nestjs/common";
import { BoardModule } from "src/board/board.module";
import { PawnModule } from "src/pawns/pawn.module";
import { RoomController } from "./room.controller";
import { RoomGateway } from "./room.gateway";
import { RoomService } from "./room.service";

@Module({
    imports: [BoardModule, PawnModule],
    providers: [RoomService, RoomGateway],
    controllers: [RoomController],
    exports: [RoomService]
})
export class RoomModule {}