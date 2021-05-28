import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io'
import { RoomService } from "./room.service";
import { v1 as uuidv1 } from 'uuid'

@WebSocketGateway()
export class RoomGateway implements OnGatewayInit {

    parties: Array<string>
    
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
        this.roomService.startGame(6);
        console.log(data.roomId);
        client.emit('startGame');
        this.server.to(data.roomId).emit('startGame');
    }

    @SubscribeMessage('movePawn')
    handleMovePawn(client: Socket,
    data: { sender: string, roomId: string,
    movement: { oldX: number, oldY: number, newX: number, newY: number } }): void {
        if (this.roomService.movePawn(data.movement)) {
            this.server.to(data.roomId).emit('movePawn', data)
        } else {
            client.emit('impossibleMove')
        }
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: {name: string, roomId: string}): void {
        console.log('room joined');
        client.join(data.roomId)
        client.emit('joinRoom', data.roomId);
        this.server.to(data.roomId).emit('newPlayer', data.name);
    }

}