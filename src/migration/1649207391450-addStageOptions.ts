import { MigrationInterface, QueryRunner,createQueryBuilder } from "typeorm"

export class addStageOptions1649207391450 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO stage (description, stageidentifier) VALUES ('User is not add on database.', 'USER_NOT_ADD')`
        );

        await queryRunner.query(
            `INSERT INTO stage (description, stageidentifier) VALUES ('User have to provide a valid email.', 'USER_DONT_HAVE_EMAIL')`
        );

        await queryRunner.query(
            `INSERT INTO stage (description, stageidentifier) VALUES ('User complete all informations.', 'USER_COMPLETE_PROFILE')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
