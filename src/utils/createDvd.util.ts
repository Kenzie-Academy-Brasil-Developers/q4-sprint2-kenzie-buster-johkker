import { Dvd, Stock } from "../entities";
import { dvdRepository, stockRepository } from "../repositories";
import { IDvdCreate } from "../interfaces";
import { AppError } from "../errors";

const createDvd = async (data: IDvdCreate) => {
  const { name, duration, quantity, price } = data;

  const existingDvd = await dvdRepository.findOne({
    where: { name: name },
  });

  if (existingDvd) {
    throw new AppError("Dvd already registered", 409);
  }

  const stock = new Stock();
  stock.price = price;
  stock.quantity = quantity;

  stockRepository.create(stock);
  await stockRepository.save(stock);

  const dvd = new Dvd();
  dvd.name = name;
  dvd.duration = duration;
  dvd.stock = stock;

  dvdRepository.create(dvd);
  await dvdRepository.save(dvd);

  return dvd;
};

export default createDvd;
