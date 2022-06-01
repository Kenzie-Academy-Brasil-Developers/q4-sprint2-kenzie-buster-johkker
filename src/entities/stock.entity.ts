import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ name: "quantity", type: "int" })
  quantity: number;

  @Column({ name: "price", type: "decimal" })
  price: number;
}
