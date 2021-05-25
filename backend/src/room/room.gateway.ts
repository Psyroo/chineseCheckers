import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io'
const uniqid = require('uniqid');

@WebSocketGateway({ namespace: '/room' })
export class RoomGateway {

    parties: Array<string>
    
    public cosntructor (parties: Array<string>) {
        this.parties = parties;
    }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('chatToServer')
    handleMessage(client: Socket, message: { sender: string, room: string, message: string}) {
       this.server.to(message.room).emit('chatToClient', message);
    }

    @SubscribeMessage('createRoom')
    handleCreateRoom(client: Socket, sender: string) {
        let id: string | undefined;

        while (id === undefined) {
            id = uniqid();

            if (this.parties.includes(id))
                id = undefined;
        }
        client.join(id);
        client.to(id).emit('Room Created', { room: id });
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, roomId: string) {
        client.join(roomId)
        client.emit('joinedRoom', roomId);
    }

}