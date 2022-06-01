import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1654011989100 implements MigrationInterface {
    name = 'initialMigration1654011989100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dvd" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_1a7f37c43aab7c9a335ee666451" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paid" boolean NOT NULL, "email" double precision NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, "cartId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_342497b574edb2309ec8c6b62a" UNIQUE ("cartId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" numeric NOT NULL, "userId" uuid, CONSTRAINT "PK_634c4687b54f6a44ac0c142adf7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_products_dvd" ("cartId" uuid NOT NULL, "dvdId" uuid NOT NULL, CONSTRAINT "PK_fbe70cbfee19f0bc98ce20bd3db" PRIMARY KEY ("cartId", "dvdId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_50bdfaf9206c62d7d992a0c49f" ON "cart_products_dvd" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_aa0da5fb27431b9004266fbeb1" ON "cart_products_dvd" ("dvdId") `);
        await queryRunner.query(`CREATE TABLE "buy_products_dvd" ("buyId" uuid NOT NULL, "dvdId" uuid NOT NULL, CONSTRAINT "PK_59d7a45137bf231ea5a274236be" PRIMARY KEY ("buyId", "dvdId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e1b5a3640f4469428d4500db91" ON "buy_products_dvd" ("buyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b063e3eb2faf7d92ff50b9056d" ON "buy_products_dvd" ("dvdId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_342497b574edb2309ec8c6b62aa" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buy" ADD CONSTRAINT "FK_73b6d9b1037a714d3314e038819" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_products_dvd" ADD CONSTRAINT "FK_50bdfaf9206c62d7d992a0c49fc" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_dvd" ADD CONSTRAINT "FK_aa0da5fb27431b9004266fbeb14" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buy_products_dvd" ADD CONSTRAINT "FK_e1b5a3640f4469428d4500db91e" FOREIGN KEY ("buyId") REFERENCES "buy"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buy_products_dvd" ADD CONSTRAINT "FK_b063e3eb2faf7d92ff50b9056d0" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buy_products_dvd" DROP CONSTRAINT "FK_b063e3eb2faf7d92ff50b9056d0"`);
        await queryRunner.query(`ALTER TABLE "buy_products_dvd" DROP CONSTRAINT "FK_e1b5a3640f4469428d4500db91e"`);
        await queryRunner.query(`ALTER TABLE "cart_products_dvd" DROP CONSTRAINT "FK_aa0da5fb27431b9004266fbeb14"`);
        await queryRunner.query(`ALTER TABLE "cart_products_dvd" DROP CONSTRAINT "FK_50bdfaf9206c62d7d992a0c49fc"`);
        await queryRunner.query(`ALTER TABLE "buy" DROP CONSTRAINT "FK_73b6d9b1037a714d3314e038819"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_342497b574edb2309ec8c6b62aa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b063e3eb2faf7d92ff50b9056d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1b5a3640f4469428d4500db91"`);
        await queryRunner.query(`DROP TABLE "buy_products_dvd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aa0da5fb27431b9004266fbeb1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_50bdfaf9206c62d7d992a0c49f"`);
        await queryRunner.query(`DROP TABLE "cart_products_dvd"`);
        await queryRunner.query(`DROP TABLE "buy"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "dvd"`);
    }

}
