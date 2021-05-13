import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity'
import { AuthMiddleware } from './auth.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    controllers: [
        UsersController
    ],
    exports: [UsersService]
})

export class UsersModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware)
        .forRoutes({path: 'user', method: RequestMethod.GET})
    }
}