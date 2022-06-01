import { AppError } from "../errors";
import { User, Dvd, Stock, Cart } from "../entities";
import { cartRepository, stockRepository } from "../repositories";

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

  stock.quantity -= quantity;
  await stockRepository.save(stock);

  cart.products.push(dvd);
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
