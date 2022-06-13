import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Dvd } from "./dvd.entity";
import { DvdToBeSold } from "./dvdToBeSold.entity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ name: "paid", type: "boolean" })
  paid: boolean;

  @Column({ name: "total", type: "float" })
  total: number;

  @ManyToMany(() => DvdToBeSold, { eager: true })
  @JoinTable()
  products: DvdToBeSold[];
}
