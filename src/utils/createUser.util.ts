import { Cart, User } from "../entities";
import { cartRepository, userRepository } from "../repositories";
import { IUserCreate } from "../interfaces";
import { AppError } from "../errors";
const createUser = async (data: IUserCreate) => {
  const { name, email, password, isAdm } = data;

  const existingUser = await userRepository.findOne({
    where: { email: email },
  });

  if (existingUser) {
    throw new AppError("E-mail already registered", 409);
  }

  const cart = new Cart();
  cart.paid = false;
  cart.total = 0;

  cartRepository.create(cart);
  cartRepository.save(cart);

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = password;
  user.isAdm = isAdm;
  user.cart = cart;

  userRepository.create(user);
  await userRepository.save(user);

  return {
    isAdm: user.isAdm,
    name: user.name,
    email: user.email,
    id: user.id,
  };
};

export default createUser;
