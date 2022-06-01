import { Database } from "../data-source";
import { Cart, Dvd, Stock, User } from "../entities";

export const userRepository = Database.getRepository(User);
export const cartRepository = Database.getRepository(Cart);
export const dvdRepository = Database.getRepository(Dvd);
export const stockRepository = Database.getRepository(Stock);
