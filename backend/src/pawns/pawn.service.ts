import { Injectable } from "@nestjs/common";
import { Pawn } from "./pawn.interface";

@Injectable()
export class PawnService {

    public initPawns(teamsNumber: number, board: Array<Array<string>>): Array<Pawn> {
        let pawnsPlace: Array<Pawn> = [];
        for (let i = 0; i < 17; i ++) {
            for (let j = 0; j < 25; j ++) {
                if (teamsNumber >= 2) {
                    if (board[i][j] === 'r' || board[i][j] === 'v') {
                        const pawn: Pawn = {
                            x: j,
                            y: i,
                            team: board[i][j]
                        }
                        pawnsPlace.push(pawn);
                    }
                }
                if (teamsNumber >= 3) {
                    if (board[i][j] === 'o') {
                        const pawn: Pawn = {
                            x: j,
                            y: i,
                            team: board[i][j]
                        }
                        pawnsPlace.push(pawn);
                    }
                }
                if(teamsNumber >= 4) {
                    if (board[i][j] === 'm') {
                        const pawn: Pawn = {
                            x: j,
                            y: i,
                            team: board[i][j]
                        }
                        pawnsPlace.push(pawn);
                    }
                }
                if (teamsNumber >= 5) {
                    if (board[i][j] === 'b') {
                        const pawn: Pawn = {
                            x: j,
                            y: i,
                            team: board[i][j]
                        }
                        pawnsPlace.push(pawn);
                    }
                }
                if (teamsNumber >= 6) {
                    if (board[i][j] === 'j') {
                        const pawn: Pawn = {
                            x: j,
                            y: i,
                            team: board[i][j]
                        }
                        pawnsPlace.push(pawn);
                    }
                }
            }
        }
        return pawnsPlace;
    }
}