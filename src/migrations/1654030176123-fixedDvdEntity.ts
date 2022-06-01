import { MigrationInterface, QueryRunner } from "typeorm";

export class fixedDvdEntity1654030176123 implements MigrationInterface {
    name = 'fixedDvdEntity1654030176123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvd" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "dvd" DROP COLUMN "price"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvd" ADD "price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD "quantity" integer NOT NULL`);
    }

}
