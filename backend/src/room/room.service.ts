import { Injectable } from "@nestjs/common";
import { PawnService } from "src/pawns/pawn.service";
import { BoardService } from "../board/board.service";
import { Pawn } from "../pawns/pawn.interface";

@Injectable()
export class RoomService {

    private pawns: Array<Pawn>
    private board: Array<Array<string>>

    public constructor(private boardService: BoardService, private pawnService: PawnService) {
        
    }

    public startGame(teamsNumber: number): number {
        this.board = this.boardService.createBoard()
        this.pawns = this.pawnService.initPawns(teamsNumber, this.board);
        return 0
    }
}