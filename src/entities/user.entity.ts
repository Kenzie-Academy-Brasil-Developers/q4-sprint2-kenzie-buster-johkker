import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Buy } from "./buy.entity";
import { Cart } from "./cart.entity";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ name: "name", type: "varchar" })
  name: string;

  @Column({ name: "email", type: "varchar" })
  email: string;

  @Column({ name: "password", type: "varchar" })
  password: string;

  @Column({ name: "isAdm", type: "boolean" })
  isAdm: boolean;

  @OneToMany(() => Buy, (buy) => buy.user, {
    eager: true,
  })
  buys: Buy[];

  @OneToOne(() => Cart, {
    eager: true,
  })
  @JoinColumn()
  cart: Cart;
}
