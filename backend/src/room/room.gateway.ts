import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io'
import { RoomService } from "./room.service";
import { v1 as uuidv1 } from 'uuid'
import { Pawn } from "src/pawns/pawn.interface";

@WebSocketGateway()
export class RoomGateway implements OnGatewayInit {

    private games: Array<{ roomId: string, pawns: Array<Pawn> }> = []
    private gamesPlayers: Array<{ roomId: string, players: Array<string> }> = []
    private board: Array<Array<string>>;
    private teams: Array<string> = ["red", "green", "orange", "purple", "blue", "yellow"]

    public constructor(private roomService: RoomService) {
    }

    @WebSocketServer()
    server: Server;

    afterInit(server: any) {
        console.log('Server started');
    }

    @SubscribeMessage('chatToServer')
    handleMessage(client: Socket, data: { sender: string, room: string, message: string }): void {
        this.server.to(data.room).emit('chatToClient', data.message);
    }

    @SubscribeMessage('createRoom')
    handleCreateRoom(client: Socket): void {
        const id = uuidv1();
        client.join(id);
        client.emit('roomCreated', { room: id });
    }

    @SubscribeMessage('startGame')
    handleStartGame(client: Socket, data: { roomId: string }): void {
        const currentGame = this.gamesPlayers.find((game) => game.roomId === data.roomId);
        this.board = this.roomService.createBoard();
        const pawns = this.roomService.createPawns(currentGame.players.length, this.board);
        this.games.push({ roomId: data.roomId, pawns: pawns })
        this.server.to(data.roomId).emit('startGame', pawns);
    }

    @SubscribeMessage('movePawn')
    handleMovePawn(client: Socket,
        data: {
            sender: string, roomId: string,
            movement: { oldX: number, oldY: number, newX: number, newY: number }
        }): void {
        const currentGame = this.games.find((game) => game.roomId === data.roomId)
        currentGame.pawns = this.roomService.movePawn(this.board, currentGame.pawns, data.movement)
        this.games.map((game) => {
            if (game.roomId === data.roomId) {
                game.pawns = currentGame.pawns;
            }
        })
        this.server.to(data.roomId).emit('movePawn', currentGame.pawns);
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { name: string, roomId: string }): void {
        client.join(data.roomId)
        let player: Array<string> = []
        let team: string = 'black';
        if (this.gamesPlayers.find((room) => room.roomId === data.roomId) === undefined) {
            player.push(data.name)
            this.gamesPlayers.push({ roomId: data.roomId, players: player })
            team = this.teams[0]
        } else {
            this.gamesPlayers.map((game) => {
                if (game.roomId === data.roomId) {
                    game.players.push(data.name);
                    player = game.players;
                    team = this.teams[game.players.length - 1]
                }
            })
        }
        client.emit('joinRoom', {roomId: data.roomId, team: team});
        this.server.to(data.roomId).emit('newPlayer', player);
    }

}