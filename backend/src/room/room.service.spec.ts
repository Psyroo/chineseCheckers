import { Test } from '@nestjs/testing';
import { RoomService } from './room.service';
import { BoardService } from '../board/board.service';
import { PawnService } from '../pawns/pawn.service';

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

export const mockPawnArray = [
    {x: 1, y: 1, team: 'red'},
    {x: 2, y: 2, team: 'green'},
];

describe('RoomService', () => {
    let roomService: RoomService;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [RoomService, BoardService, PawnService]
        }).compile();

        roomService = moduleRef.get<RoomService>(RoomService);
    });

    it('should be defined', () => {
        expect(roomService).toBeDefined();
    }),

    it('should create room', () => {
        const room = roomService.createRoom();
        expect(room).toBeDefined();
    }),

    it('should create board', () => {
        const board = roomService.createBoard();
        expect(board).toBeDefined();
    }),

    it('should create pawns', () => {
        const pawns = roomService.createPawns(2, mockBoard);
        expect(pawns).toBeDefined();
    }),

    it('should check movement', () => {
        const res = roomService.checkMovement(
            mockBoard,
            mockPawnArray,
            {oldX: 1, oldY: 1, newX: 5, newY: 5},
            'red'
        );
        expect(res).toBeFalsy();
    }),

    it('should move pawn', () => {
        const pawns = roomService.movePawn(
            mockBoard,
            mockPawnArray,
            {oldX: 1, oldY: 1, newX: 1, newY: 2}
        );
        expect(pawns[0].y).toBe(2);
    }),

    it('should check end', () => {
        const res = roomService.checkEnd(mockBoard, mockPawnArray, 'red');

        expect(res).toBeFalsy();
    })
});