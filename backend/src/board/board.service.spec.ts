import { Test } from '@nestjs/testing';
import { BoardService } from './board.service';

describe('BoardService', () => {
    let boardService: BoardService;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [BoardService]
        }).compile();
        boardService = moduleRef.get<BoardService>(BoardService);
    });

    it('should be defined', () => {
        expect(boardService).toBeDefined();
    }),

    it('should get board', () => {
        const board = boardService.createBoard();
        expect(board).toBeDefined();
    })
});