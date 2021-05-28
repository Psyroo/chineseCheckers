import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io'
import { RoomService } from "./room.service";
import { v1 as uuidv1 } from 'uuid'
import { Pawn } from "src/pawns/pawn.interface";

@WebSocketGateway()
export class RoomGateway implements OnGatewayInit {

    private pawns: Array<Pawn>
    private board: Array<Array<string>>;
    
    public constructor (private roomService: RoomService) {
    }

    @WebSocketServer()
    server: Server;

    afterInit(server: any) {
        console.log('Server started');
    }

    @SubscribeMessage('chatToServer')
    handleMessage(client: Socket, data: { sender: string, room: string, message: string}): void {
       this.server.to(data.room).emit('chatToClient', data.message);
    }

    @SubscribeMessage('createRoom')
    handleCreateRoom(client: Socket): void {
       const id = uuidv1();
        client.join(id);
        client.emit('roomCreated', { room: id });
    }

    @SubscribeMessage('startGame')
    handleStartGame(client: Socket, data: {roomId: string}): void {
        this.board = this.roomService.createBoard();
        this.pawns = this.roomService.createPawns(6, this.board);
        this.server.to(data.roomId).emit('startGame', this.pawns);
    }

    @SubscribeMessage('movePawn')
    handleMovePawn(client: Socket,
    data: { sender: string, roomId: string,
    movement: { oldX: number, oldY: number, newX: number, newY: number } }): void {
        this.pawns = this.roomService.movePawn(this.board, this.pawns,data.movement)
        this.server.to(data.roomId).emit('movePawn', this.pawns)
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: {name: string, roomId: string}): void {
        client.join(data.roomId)
        client.emit('joinRoom', data.roomId);
        this.server.to(data.roomId).emit('newPlayer', data.name);
    }

}