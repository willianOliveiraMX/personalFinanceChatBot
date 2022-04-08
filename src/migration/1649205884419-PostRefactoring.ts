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
                        name: 'updatedAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'isValid',
                        type: 'boolean',
                        default: true,
                    },
                ],
            }),
            true
        );

        await queryRunner.createTable(
            new Table({
                name: 'tempUserInfo',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'userTempData',
                        type: 'json',
                        isNullable: true,
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
            true
        );

        await queryRunner.createTable(
            new Table({
                name: 'userStage',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'stageId',
                        type: 'int',
                    },
                    {
                        name: 'tempUserId',
                        type: 'int',
                    },
                    {
                        name: 'tokenChatId',
                        type: 'varchar',
                        isUnique: true,
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            'userStage',
            new TableForeignKey({
              columnNames: ['stageId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'stage',
            }),
        );

        await queryRunner.createForeignKey(
            'userStage',
            new TableForeignKey({
              columnNames: ['tempUserId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'tempUserInfo',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('stage');
        await queryRunner.dropTable('userStage');
    }

}
