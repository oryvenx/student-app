import { MigrationInterface, QueryRunner } from "typeorm";

export class StudentRefactor1794645088367 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "Alter table "
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
