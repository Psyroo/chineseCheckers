import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'checker',
            password: 'checkerpwd',
            database: 'chinese_checker',
            entities: [],
            synchronize: true,
        })
    ]
})
export class DatabaseModule {}
