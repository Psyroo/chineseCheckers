import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'checker',
            password: 'checkerpwd',
            database: 'chinese_checker',
            entities: [User],
            synchronize: true,
            migrations: ["dist/migrations/*{.ts,.js}"],
            migrationsTableName: "migrations_typeorm",
            migrationsRun: true
        })
    ]
})
export class DatabaseModule {}
