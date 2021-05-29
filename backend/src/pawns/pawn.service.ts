import { Injectable } from "@nestjs/common";
import { Pawn } from "./pawn.interface";

@Injectable()
export class PawnService {

    public initPawns(teamsNumber: number, board: Array<Array<string>>): Array<Pawn> {
        let pawnsPlace: Array<Pawn> = [];
        for (let i = 0; i < 18; i ++) {
            for (let j = 0; j < 26; j ++) {
                if (teamsNumber >= 1) {
                    if (board[i][j] === 'r') {
                        const pawn: Pawn = {
                            x: j,
                            y: i,
                            team: 'red'
                        }
                        pawnsPlace.push(pawn);
                    }
                }
                if (teamsNumber >= 1) {
                    if (board[i][j] === 'v') {
                        const pawn: Pawn = {
                            x: j,
                            y: i,
                            team: 'green'
                        }
                        pawnsPlace.push(pawn);
                    }
                }
                if (teamsNumber >= 3) {
                    if (board[i][j] === 'o') {
                        const pawn: Pawn = {
                            x: j,
                            y: i,
                            team: 'orange'
                        }
                        pawnsPlace.push(pawn);
                    }
                }
                if(teamsNumber >= 4) {
                    if (board[i][j] === 'm') {
                        const pawn: Pawn = {
                            x: j,
                            y: i,
                            team: "purple"
                        }
                        pawnsPlace.push(pawn);
                    }
                }
                if (teamsNumber >= 5) {
                    if (board[i][j] === 'b') {
                        const pawn: Pawn = {
                            x: j,
                            y: i,
                            team: "blue"
                        }
                        pawnsPlace.push(pawn);
                    }
                }
                if (teamsNumber >= 6) {
                    if (board[i][j] === 'j') {
                        const pawn: Pawn = {
                            x: j,
                            y: i,
                            team: "yellow"
                        }
                        pawnsPlace.push(pawn);
                    }
                }
            }
        }
        return pawnsPlace;
    }
}