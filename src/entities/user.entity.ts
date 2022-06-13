import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
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

  @OneToOne(() => Cart, {
    eager: true,
  })
  @JoinColumn()
  cart: Cart;
}
