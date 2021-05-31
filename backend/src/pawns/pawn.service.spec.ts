import { Test } from '@nestjs/testing';
import { PawnService } from './pawn.service';

export const mockBoard = [
            ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'r', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'r', 'z', 'r', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'r', 'z', 'r', 'z', 'r', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'r', 'z', 'r', 'z', 'r', 'z', 'r', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z'],
            ['z', 'j', 'z', 'j', 'z', 'j', 'z', 'j', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'o', 'z', 'o', 'z', 'o', 'z', 'o', 'z'],
            ['z', 'z', 'j', 'z', 'j', 'z', 'j', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'o', 'z', 'o', 'z', 'o', 'z', 'z'],
            ['z', 'z', 'z', 'j', 'z', 'j', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'o', 'z', 'o', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z', 'j', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'o', 'z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z', 'm', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'b', 'z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'm', 'z', 'm', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'b', 'z', 'b', 'z', 'z', 'z'],
            ['z', 'z', 'm', 'z', 'm', 'z', 'm', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'b', 'z', 'b', 'z', 'b', 'z', 'z'],
            ['z', 'm', 'z', 'm', 'z', 'm', 'z', 'm', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'n', 'z', 'b', 'z', 'b', 'z', 'b', 'z', 'b', 'z'],
            ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'v', 'z', 'v', 'z', 'v', 'z', 'v', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'v', 'z', 'v', 'z', 'v', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'v', 'z', 'v', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'v', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z'],
            ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z'],
        ];

describe('PawnService', () => {
    let pawnService: PawnService;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [PawnService]
        }).compile();
        pawnService = moduleRef.get<PawnService>(PawnService);
    });

    it('should be defined', () => {
        expect(pawnService).toBeDefined();
    }),

    it('should init pawns', () => {
        const pawns = [
            pawnService.initPawns(2, mockBoard),
            pawnService.initPawns(3, mockBoard),
            pawnService.initPawns(4, mockBoard),
            pawnService.initPawns(5, mockBoard),
            pawnService.initPawns(6, mockBoard),
        ]
        // 2 players
        expect(pawns[0].length).toBe(20);
        expect(pawns[0][0].team).toStrictEqual('red');
        expect(pawns[0][10].team).toStrictEqual('green');

        // 3 players
        expect(pawns[1].length).toBe(30);
        expect(pawns[1][0].team).toStrictEqual('red');
        expect(pawns[1][10].team).toStrictEqual('orange');
        expect(pawns[1][20].team).toStrictEqual('green');

        // 4 players
        expect(pawns[2].length).toBe(40);
        expect(pawns[2][0].team).toStrictEqual('red');
        expect(pawns[2][10].team).toStrictEqual('orange');
        expect(pawns[2][20].team).toStrictEqual('purple');
        expect(pawns[2][30].team).toStrictEqual('green');
        
        // 5 players
        expect(pawns[3].length).toBe(50);
        expect(pawns[3][0].team).toStrictEqual('red');
        expect(pawns[3][10].team).toStrictEqual('orange');
        expect(pawns[3][20].team).toStrictEqual('purple');
        expect(pawns[3][30].team).toStrictEqual('blue');
        expect(pawns[3][40].team).toStrictEqual('green');

        // 6 players
        expect(pawns[4].length).toBe(60);
        expect(pawns[4][0].team).toStrictEqual('red');
        expect(pawns[4][10].team).toStrictEqual('yellow');
        expect(pawns[4][15].team).toStrictEqual('orange');
        expect(pawns[4][30].team).toStrictEqual('purple');
        expect(pawns[4][40].team).toStrictEqual('blue');
        expect(pawns[4][50].team).toStrictEqual('green');
    });
});