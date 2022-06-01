import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Stock } from "./stock.entity";

@Entity()
@Unique(["name"])
export class Dvd {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ name: "name", type: "varchar" })
  name: string;

  @Column({ name: "duration", type: "varchar" })
  duration: string;

  @OneToOne(() => Stock, {
    eager: true,
  })
  @JoinColumn()
  stock: Stock;
}
