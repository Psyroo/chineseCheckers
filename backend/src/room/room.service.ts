import { Injectable } from "@nestjs/common";
import { PawnService } from "src/pawns/pawn.service";
import { BoardService } from "../board/board.service";
import { Pawn } from "../pawns/pawn.interface";
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class RoomService {

    private pawns: Array<Pawn>
    private board: Array<Array<string>>

    public constructor(private boardService: BoardService, private pawnService: PawnService) {
        
    }

    public createRoom(): string {
        return uuidv1();
    }

    public startGame(teamsNumber: number): number {
        this.board = this.boardService.createBoard()
        this.pawns = this.pawnService.initPawns(teamsNumber, this.board);
        return 0
    }

    checkNextCase(coordinates: { oldX: number, oldY: number, newX: number, newY: number }): boolean {
        if ((coordinates.newX - coordinates.oldX === 1 && coordinates.newY - coordinates.oldY === 1)
        || (coordinates.newX - coordinates.oldX === -1 && coordinates.newY - coordinates.oldY === 1)
        || (coordinates.newX - coordinates.oldX === 1 && coordinates.newY - coordinates.oldY === -1)
        || (coordinates.newX - coordinates.oldX === -1 && coordinates.newY - coordinates.oldY === -1)) {
            return true;
        }
    }

    updatePawnPlace(coordinates: { oldX: number, oldY: number, newX: number, newY: number }): void {
        this.pawns.forEach(pawn => {
            if (pawn.x === coordinates.oldX && pawn.y === coordinates.oldY) {
                pawn.x = coordinates.newX;
                pawn.y = coordinates.newY;
            }
        });
    }

    public movePawn(coordinates: { oldX: number, oldY: number, newX: number, newY: number }): boolean {
            if (this.board[coordinates.newX][coordinates.newY] === 'z') {
            return false;
        }
        const locationAlreadyTaken = this.pawns.some(p => p.x === coordinates.newX && p.y === coordinates.newY)
        if (locationAlreadyTaken) {
            return false;
        }
        if (this.checkNextCase(coordinates)) {
            this.updatePawnPlace(coordinates);
            return true;
        }
        return true
    }
}