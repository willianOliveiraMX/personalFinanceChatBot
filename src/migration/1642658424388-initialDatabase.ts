import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class initialDatabase1642658424388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'token',
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
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'debt',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'userId',
            type: 'int',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'int',
          },
          {
            name: 'installmentTotal',
            type: 'int',
          },
          {
            name: 'installmentCurrent',
            type: 'int',
          },
          {
            name: 'dateToPay',
            type: 'timestamp',
          },
          {
            name: 'monthId',
            type: 'int',
            isUnique: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'debt',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'income',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'integer',
          },
          {
            name: 'monthId',
            type: 'integer',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
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
      true,
    );

    await queryRunner.createForeignKey(
      'income',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'monthReference',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'year',
            type: 'varchar',
          },
          {
            name: 'month',
            type: 'varchar',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
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
      true,
    );

    await queryRunner.createForeignKey(
      'income',
      new TableForeignKey({
        columnNames: ['monthId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'monthReference',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'debt',
      new TableForeignKey({
        columnNames: ['monthId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'monthReference',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'balance',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'userId',
            type: 'int',
            isUnique: true,
          },
          {
            name: 'value',
            type: 'integer',
          },
          {
            name: 'monthId',
            type: 'integer',
            isUnique: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
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
      true,
    );

    await queryRunner.createForeignKey(
      'balance',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('debt');
    await queryRunner.dropTable('income');
    await queryRunner.dropTable('monthReference');
    await queryRunner.dropTable('user');
  }
}
