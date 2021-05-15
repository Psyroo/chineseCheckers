import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io'

@WebSocketGateway({ namespace: 'room' })
export class Room{

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('chatToServer')
    handleMessage(client: Socket, message: { sender: string, room: string, message: string}) {
        this.server.to(message.room).emit('chatToClient', message);
    }

}