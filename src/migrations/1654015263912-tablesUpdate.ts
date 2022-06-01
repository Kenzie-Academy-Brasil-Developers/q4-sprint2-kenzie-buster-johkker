import { MigrationInterface, QueryRunner } from "typeorm";

export class tablesUpdate1654015263912 implements MigrationInterface {
    name = 'tablesUpdate1654015263912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "email" TO "total"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "total" TO "email"`);
    }

}
