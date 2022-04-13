import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class PostRefactoring1649205884419 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'stage',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'stageidentifier',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'updatedat',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'createdat',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'isvalid',
                        type: 'boolean',
                        default: true,
                    },
                ],
            }),
            true
        );

        await queryRunner.createTable(
            new Table({
                name: 'temp_user_info',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'usertempdata',
                        type: 'json',
                        isNullable: true,
                    },
                    {
                        name: 'updatedat',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'createdat',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
            true
        );

        await queryRunner.createTable(
            new Table({
                name: 'user_stage',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'stageid',
                        type: 'int',
                    },
                    {
                        name: 'temp_userid',
                        type: 'int',
                    },
                    {
                        name: 'token_chatid',
                        type: 'varchar',
                        isUnique: true,
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            'user_stage',
            new TableForeignKey({
              columnNames: ['stageid'],
              referencedColumnNames: ['id'],
              referencedTableName: 'stage',
            }),
        );

        await queryRunner.createForeignKey(
            'user_stage',
            new TableForeignKey({
              columnNames: ['temp_userid'],
              referencedColumnNames: ['id'],
              referencedTableName: 'temp_user_info',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('stage');
        await queryRunner.dropTable('user_stage');
    }

}
