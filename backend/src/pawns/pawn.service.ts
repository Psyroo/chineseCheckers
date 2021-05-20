import { Injectable } from "@nestjs/common";
import { Pawn } from "./pawn.interface";

@Injectable()
export class PawnService {

    public initPawns(teamsNumber: number, board: Array<Array<string>>): Array<Pawn> {
        
        let pawnsPlace: Array<Pawn>;
        if (teamsNumber >= 2) {
            for (let i = 0; i < 25; i ++) {
                for (let j = 0; i < 25; j ++) {
                    if (board[i][j] === 'r' || board[i][j] === 'v') {
                        const pawn: Pawn = {
                            x: i,
                            y: j,
                            team: board[i][j]
                        }
                        pawnsPlace.push(pawn);
                    }
                }
            }
        }
        if (teamsNumber >= 3) {
            for (let i = 0; i < 25; i ++) {
                for (let j = 0; i < 25; j ++) {
                    if (board[i][j] === 'o') {
                        const pawn: Pawn = {
                            x: i,
                            y: j,
                            team: board[i][j]
                        }
                        pawnsPlace.push(pawn);
                    }
                }
            }
        }
        if (teamsNumber >= 4) {
            for (let i = 0; i < 25; i ++) {
                for (let j = 0; i < 25; j ++) {
                    if (board[i][j] === 'm') {
                        const pawn: Pawn = {
                            x: i,
                            y: j,
                            team: board[i][j]
                        }
                        pawnsPlace.push(pawn);
                    }
                }
            }
        }
        if (teamsNumber >= 5) {
            for (let i = 0; i < 25; i ++) {
                for (let j = 0; i < 25; j ++) {
                    if (board[i][j] === 'b') {
                        const pawn: Pawn = {
                            x: i,
                            y: j,
                            team: board[i][j]
                        }
                        pawnsPlace.push(pawn);
                    }
                }
            }
        }
        if (teamsNumber >= 6) {
            for (let i = 0; i < 25; i ++) {
                for (let j = 0; i < 25; j ++) {
                    if (board[i][j] === 'j') {
                        const pawn: Pawn = {
                            x: i,
                            y: j,
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