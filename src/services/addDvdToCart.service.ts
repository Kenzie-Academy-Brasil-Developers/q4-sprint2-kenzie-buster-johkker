import { AppError } from "../errors";
import { User, Stock, Cart, DvdToBeSold, Dvd } from "../entities";
import {
  cartRepository,
  dvdToBeSoldRepository,
  stockRepository,
} from "../repositories";

const addDvdToCartSVC = async (
  dvd: Dvd,
  stock: Stock,
  user: User,
  cart: Cart,
  quantity: number
) => {
  if (stock.quantity < quantity) {
    throw new AppError(
      `Current stock: ${stock.quantity}. Received demand: ${quantity}`,
      422
    );
  }

  const dvdToBeSold = new DvdToBeSold();
  dvdToBeSold.amount = quantity;
  dvdToBeSold.dvd = dvd;
  console.log("dvdToBeSold before saving:", dvdToBeSold);

  dvdToBeSoldRepository.create(dvdToBeSold);
  await dvdToBeSoldRepository.save(dvdToBeSold);

  console.log("dvdToBeSold after saving:", dvdToBeSold);
  cart.products.push(dvdToBeSold);
  cart.total += stock.price * quantity;

  await cartRepository.save(cart);

  return {
    id: cart.id,
    total: cart.total,
    paid: cart.paid,
    newUser: {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdm: user.isAdm,
    },
    dvd: {
      id: dvd.id,
      name: dvd.name,
      duration: dvd.duration,
      stock: {
        stock,
      },
    },
  };
};

export default addDvdToCartSVC;
