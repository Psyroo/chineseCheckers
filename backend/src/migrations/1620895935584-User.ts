import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1620895935584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'User',
                columns: [
                    {
                        name: 'id',
                        type: 'int4',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'wins',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'loses',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'winstreak',
                        type: 'int',
                        isNullable: true,
                    },
                ]
            }),
            false
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(`DROP TABLE User`);
    }

}
