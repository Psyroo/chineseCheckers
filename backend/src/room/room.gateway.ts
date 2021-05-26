import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io'
import { RoomService } from "./room.service";
const uniqid = require('uniqid');

@WebSocketGateway({ namespace: '/room' })
export class RoomGateway {

    parties: Array<string>
    
    public constructor (parties: Array<string>, private roomService: RoomService) {
        this.parties = parties;
    }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('chatToServer')
    handleMessage(client: Socket, message: { sender: string, room: string, message: string}): void {
       this.server.to(message.room).emit('chatToClient', message);
    }

    @SubscribeMessage('createRoom')
    handleCreateRoom(client: Socket): void {
        let id: string | undefined;

        while (id === undefined) {
            id = uniqid();

            if (this.parties.includes(id))
                id = undefined;
        }
        client.join(id);
        client.to(id).emit('Room Created', { room: id });
    }

    @SubscribeMessage('startGame')
    handleStartGame(client: Socket, roomId: string): void {
        this.roomService.startGame(6);
        this.server.to(roomId).emit('game start');
    }

    @SubscribeMessage('movePawn')
    handleMovePawn(client: Socket,
    message: { sender: string, roomId: string,
    movement: { oldX: number, oldY: number, newX: number, newY: number } }): void {
        if (this.roomService.movePawn(message.movement)) {
            this.server.to(message.roomId).emit('movePawn', message)
        } else {
            client.emit('impossibleMove')
        }
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, name: string, roomId: string): void {
        client.join(roomId)
        client.emit('joinedRoom', roomId);
        this.server.to(roomId).emit('newPlayer', name);
    }

}