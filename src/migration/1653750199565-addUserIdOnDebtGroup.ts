import { MigrationInterface, QueryRunner } from "typeorm"

export class addUserIdOnDebtGroup1653750199565 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE debt_group ADD token_chatid varchar(255)`
        );

        await queryRunner.query(
            `ALTER TABLE debt_group ADD CONSTRAINT
            FK_TOKENCHATID 
            FOREIGN KEY (token_chatid) REFERENCES finance_user(token)
            `
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
