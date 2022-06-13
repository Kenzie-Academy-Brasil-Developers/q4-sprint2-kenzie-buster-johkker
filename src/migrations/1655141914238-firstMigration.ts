import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1655141914238 implements MigrationInterface {
    name = 'firstMigration1655141914238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dvd" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" character varying NOT NULL, "stockId" uuid, CONSTRAINT "UQ_378ec7a5f866f33ebfdef5ae2a4" UNIQUE ("name"), CONSTRAINT "REL_a68c996998e86e22dc2580918c" UNIQUE ("stockId"), CONSTRAINT "PK_1a7f37c43aab7c9a335ee666451" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dvd_to_be_sold" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "dvdId" uuid, CONSTRAINT "PK_f294270de632272a399e9dd3a7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paid" boolean NOT NULL, "total" double precision NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, "cartId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_342497b574edb2309ec8c6b62a" UNIQUE ("cartId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_products_dvd_to_be_sold" ("cartId" uuid NOT NULL, "dvdToBeSoldId" uuid NOT NULL, CONSTRAINT "PK_3eafbd97ae8b1b9face2847173e" PRIMARY KEY ("cartId", "dvdToBeSoldId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ac4cfe775e65af8181965f8f1f" ON "cart_products_dvd_to_be_sold" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9c7a49259e62d213752c56fc54" ON "cart_products_dvd_to_be_sold" ("dvdToBeSoldId") `);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "FK_a68c996998e86e22dc2580918c3" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dvd_to_be_sold" ADD CONSTRAINT "FK_ad5b47197c43ce385897df568b5" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_342497b574edb2309ec8c6b62aa" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_products_dvd_to_be_sold" ADD CONSTRAINT "FK_ac4cfe775e65af8181965f8f1ff" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_dvd_to_be_sold" ADD CONSTRAINT "FK_9c7a49259e62d213752c56fc544" FOREIGN KEY ("dvdToBeSoldId") REFERENCES "dvd_to_be_sold"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_products_dvd_to_be_sold" DROP CONSTRAINT "FK_9c7a49259e62d213752c56fc544"`);
        await queryRunner.query(`ALTER TABLE "cart_products_dvd_to_be_sold" DROP CONSTRAINT "FK_ac4cfe775e65af8181965f8f1ff"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_342497b574edb2309ec8c6b62aa"`);
        await queryRunner.query(`ALTER TABLE "dvd_to_be_sold" DROP CONSTRAINT "FK_ad5b47197c43ce385897df568b5"`);
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "FK_a68c996998e86e22dc2580918c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c7a49259e62d213752c56fc54"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac4cfe775e65af8181965f8f1f"`);
        await queryRunner.query(`DROP TABLE "cart_products_dvd_to_be_sold"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "dvd_to_be_sold"`);
        await queryRunner.query(`DROP TABLE "dvd"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
