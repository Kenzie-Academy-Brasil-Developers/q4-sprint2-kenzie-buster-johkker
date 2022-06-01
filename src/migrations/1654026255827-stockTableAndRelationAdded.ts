import { MigrationInterface, QueryRunner } from "typeorm";

export class stockTableAndRelationAdded1654026255827 implements MigrationInterface {
    name = 'stockTableAndRelationAdded1654026255827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD "duration" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD "stockId" uuid`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "UQ_a68c996998e86e22dc2580918c3" UNIQUE ("stockId")`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "UQ_378ec7a5f866f33ebfdef5ae2a4" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "FK_a68c996998e86e22dc2580918c3" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "FK_a68c996998e86e22dc2580918c3"`);
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "UQ_378ec7a5f866f33ebfdef5ae2a4"`);
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "UQ_a68c996998e86e22dc2580918c3"`);
        await queryRunner.query(`ALTER TABLE "dvd" DROP COLUMN "stockId"`);
        await queryRunner.query(`ALTER TABLE "dvd" DROP COLUMN "duration"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
