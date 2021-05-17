import { Injectable } from "@nestjs/common";
import { Pawn } from "src/pawns/pawn.interface";

@Injectable()
export class RoomService {

    private pawns: Array<Pawn>

    public constructor(pawns: Array<Pawn>) {
        this.pawns = pawns;
    }

    public startGame() {
        
    }
}