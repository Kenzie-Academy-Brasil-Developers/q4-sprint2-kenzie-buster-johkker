import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { AppError } from "../errors";
import { dvdRepository, stockRepository } from "../repositories";

config();

const validateDvd = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const dvd = await dvdRepository.findOne({ where: { id: id } });

  if (!dvd) {
    throw new AppError("Dvd not found", 404);
  }
  req.dvd = dvd;

  const stock = await stockRepository.findOne({ where: { id: dvd.stock.id } });

  if (!stock) {
    throw new Error();
  }

  req.stock = stock;

  return next();
};

export default validateDvd;
