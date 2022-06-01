import * as express from "express";
import { jwt } from "jsonwebtoken";
import { Cart, Dvd, Stock, User } from "../../entities";
import {
  IDvdComplete,
  IDvdCreate,
  IUser,
  IUserComplete,
  IUserPatch,
} from "../../interfaces";
import { IUserCreate } from "../../interfaces/user";

declare global {
  namespace Express {
    interface Request {
      newInput: IUserCreate | IDvdCreate;
      decoded: string | jwt.JwtPayload | undefined;
      adm: boolean;
      user: User;
      dvd: Dvd;
      stock: Stock;
      cart: Cart;
    }
  }
}
