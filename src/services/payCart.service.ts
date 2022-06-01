import { Cart } from "../entities";
import { cartRepository } from "../repositories";

const payCartSVC = async (cart: Cart) => {
  const oldCart: Cart = JSON.parse(JSON.stringify(cart));

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
          id: dvd.id,
          name: dvd.name,
          duration: dvd.duration,
        };
      }),
    },
  };
};

export default payCartSVC;
