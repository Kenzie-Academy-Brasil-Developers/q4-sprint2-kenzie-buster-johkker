import { Request, Response } from "express";
import { addDvdToCartSVC } from "../services";

const addDvdToCartCTRL = async (req: Request, res: Response) => {
  const { dvd, cart, stock, user } = req;
  const { quantity } = req.body;
  const response = await addDvdToCartSVC(dvd, stock, user, cart, quantity);
  return res.status(200).json(response);
};

export default addDvdToCartCTRL;
