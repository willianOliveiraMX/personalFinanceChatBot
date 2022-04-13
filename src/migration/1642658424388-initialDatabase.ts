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
        name: 'finance_user',
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
            isUnique: true,
          },
          {
            name: 'userid',
            type: 'int',
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
            isNullable: true,
          },
          {
            name: 'installmentCurrent',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'dateToPay',
            type: 'timestamp',
          },
          {
            name: 'monthid',
            type: 'int',
          },
          {
            name: 'groupid',
            type: 'int',
          },
          {
            name: 'isalreadypay',
            type: 'boolean'
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
    );

    await queryRunner.createForeignKey(
      'debt',
      new TableForeignKey({
        columnNames: ['userid'],
        referencedColumnNames: ['id'],
        referencedTableName: 'finance_user',
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
            name: 'userid',
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
            name: 'monthid',
            type: 'integer',
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
      true,
    );

    await queryRunner.createForeignKey(
      'income',
      new TableForeignKey({
        columnNames: ['userid'],
        referencedColumnNames: ['id'],
        referencedTableName: 'finance_user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'month_reference',
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
      true,
    );

    await queryRunner.createForeignKey(
      'income',
      new TableForeignKey({
        columnNames: ['monthid'],
        referencedColumnNames: ['id'],
        referencedTableName: 'month_reference',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'debt',
      new TableForeignKey({
        columnNames: ['monthid'],
        referencedColumnNames: ['id'],
        referencedTableName: 'month_reference',
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
            name: 'userid',
            type: 'int',
            isUnique: true,
          },
          {
            name: 'value',
            type: 'integer',
          },
          {
            name: 'monthid',
            type: 'integer',
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
      true,
    );

    await queryRunner.createForeignKey(
      'balance',
      new TableForeignKey({
        columnNames: ['userid'],
        referencedColumnNames: ['id'],
        referencedTableName: 'finance_user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'balance',
      new TableForeignKey({
        columnNames: ['monthid'],
        referencedColumnNames: ['id'],
        referencedTableName: 'month_reference',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'debt_group',
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
      true,
    );  

    await queryRunner.createForeignKey(
      'debt',
      new TableForeignKey({
        columnNames: ['groupid'],
        referencedColumnNames: ['id'],
        referencedTableName: 'debt_group',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('debt');
    await queryRunner.dropTable('income');
    await queryRunner.dropTable('month_reference');
    await queryRunner.dropTable('finance_user');
  }
}
