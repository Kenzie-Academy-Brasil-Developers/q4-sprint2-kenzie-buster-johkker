import { Cart, DvdToBeSold } from "../entities";
import {
  cartRepository,
  dvdRepository,
  dvdToBeSoldRepository,
  stockRepository,
} from "../repositories";

const payCartSVC = async (cart: Cart) => {
  const oldCart: Cart = JSON.parse(JSON.stringify(cart));
  console.log("cart:", cart);
  console.log("cart.products:", cart.products);

  for (const dvdToBeSold of cart.products) {
    let newDvdToBeSold = await dvdToBeSoldRepository.findOne({
      where: { id: dvdToBeSold.id },
    });

    if (!newDvdToBeSold) {
      throw new Error();
    }
    console.log("newDvdToBeSold:", newDvdToBeSold);
    let dvd = await dvdRepository.findOne({
      where: { id: newDvdToBeSold.dvd.id },
    });
    if (!dvd) {
      throw new Error();
    }

    let stock = await stockRepository.findOne({ where: { id: dvd.stock.id } });
    if (!stock) {
      throw new Error();
    }
    stock.quantity -= dvdToBeSold.amount;
    await stockRepository.save(stock);
  }

  cart.total = 0;
  cart.products = [];
  await cartRepository.save(cart);

  return {
    cart: {
      id: cart.id,
      paid: true,
      total: oldCart.total,
      dvds: oldCart.products.map((dvd) => {
        return {
          id: dvd.dvd.id,
          name: dvd.dvd.name,
          duration: dvd.dvd.duration,
        };
      }),
    },
  };
};

export default payCartSVC;
