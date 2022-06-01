import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { Dvd } from "./dvd.entity";

import { User } from "./user.entity";

@Entity()
export class Buy {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => User, (user) => user.buys)
  user: User;

  @ManyToMany(() => Dvd, {
    eager: true,
  })
  @JoinTable()
  products: Dvd[];

  @Column({ name: "total", type: "decimal" })
  total: number;
}
