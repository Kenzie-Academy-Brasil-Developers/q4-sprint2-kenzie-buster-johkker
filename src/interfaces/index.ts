import { Buy, Cart, Stock } from "../entities";

export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserCreate extends IUserLogin {
  name: string;
  isAdm: boolean;
}

export interface IUser extends IUserCreate {
  id: string;
}

export interface ICartCreate {
  paid: boolean;
  total: number;
}

export interface ICart extends ICartCreate {
  id: string;
}

export interface IDvdBuy {
  quantity: number;
}

export interface IDvdCreate extends IDvdBuy {
  name: string;
  duration: string;
  price: number;
}

export interface IDvd extends IDvdCreate {
  id: string;
}

export interface IDvdComplete extends IDvd {
  stock: Stock;
}

export interface IUserComplete extends IUser {
  cart: Cart;
  buys: Buy[];
}
