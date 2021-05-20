import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { DatabaseModule } from './database/database.module';
import { RoomModule } from './room/room.modules';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule, RoomModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
