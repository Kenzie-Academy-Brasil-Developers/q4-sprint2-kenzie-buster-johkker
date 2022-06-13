import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { Dvd } from "./dvd.entity";

@Entity()
export class DvdToBeSold {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ name: "amount", type: "int" })
  amount: number;

  @ManyToOne(() => Dvd, (dvd) => dvd.dvdsToBeSold)
  @JoinColumn()
  dvd: Dvd;
}
