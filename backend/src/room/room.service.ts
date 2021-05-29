import { Injectable } from "@nestjs/common";
import { PawnService } from "src/pawns/pawn.service";
import { BoardService } from "../board/board.service";
import { Pawn } from "../pawns/pawn.interface";
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class RoomService {

    public constructor(private boardService: BoardService, private pawnService: PawnService) {

    }

    public createRoom(): string {
        return uuidv1();
    }

    public createBoard(): Array<Array<string>> {
        const board = this.boardService.createBoard()
        return board
    }

    public createPawns(teamsNumber: number, board: Array<Array<string>>): Array<Pawn> {
        const pawns = this.pawnService.initPawns(teamsNumber, board);
        return pawns
    }

    private checkNextCase(coordinates: { oldX: number, oldY: number, newX: number, newY: number }): boolean {
        if ((coordinates.newX - coordinates.oldX === 1 && coordinates.newY - coordinates.oldY === 1)
            || (coordinates.newX - coordinates.oldX === -1 && coordinates.newY - coordinates.oldY === 1)
            || (coordinates.newX - coordinates.oldX === 1 && coordinates.newY - coordinates.oldY === -1)
            || (coordinates.newX - coordinates.oldX === -1 && coordinates.newY - coordinates.oldY === -1)) {
            return true;
        }
    }

    private updatePawnPlace(pawns: Array<Pawn>, coordinates: { oldX: number, oldY: number, newX: number, newY: number }): Array<Pawn> {
        pawns.forEach(pawn => {
            if (pawn.x === coordinates.oldX && pawn.y === coordinates.oldY) {
                pawn.x = coordinates.newX;
                pawn.y = coordinates.newY;
            }
        });
        return pawns;
    }

    private checkGoodTeam(pawns: Array<Pawn>, team: string, x: number, y: number): boolean {
        const pawn = pawns.find((pawn) => pawn.x === x && pawn.y === y)
        if (pawn.team === team) {
            console.log('it is true')
            return true;
        }

        return false;
    }

    public checkMovement(board: Array<Array<string>>, pawns: Array<Pawn>,
        coordinates: { oldX: number, oldY: number, newX: number, newY: number }, team: string): boolean {
        if (this.checkGoodTeam(pawns, team, coordinates.oldX, coordinates.oldY) === false) {
            console.log('poadkpazd')
            return false;
        }

        return true;
    }

    public movePawn(board: Array<Array<string>>, pawns: Array<Pawn>,
        coordinates: { oldX: number, oldY: number, newX: number, newY: number }): Array<Pawn> {
        // console.log(coordinates)
        // if (board[coordinates.newY][coordinates.newX] === 'z') {
        //     return false;
        // }
        // const locationAlreadyTaken = pawns.some(p => p.x === coordinates.newX && p.y === coordinates.newY)
        // if (locationAlreadyTaken) {
        //     return false;
        // }
        // if (this.checkNextCase(coordinates)) {
        pawns = this.updatePawnPlace(pawns, coordinates);
        //     return true;
        // }
        return pawns;
    }
}