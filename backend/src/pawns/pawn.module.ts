import { Module } from "@nestjs/common";
import { PawnService } from "./pawn.service";

@Module({
    providers: [PawnService],
    exports: [PawnService]
})

export class PawnModule {}