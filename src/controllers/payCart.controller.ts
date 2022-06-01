import { Request, Response } from "express";
import { payCartSVC } from "../services";

const payCartCTRL = async (req: Request, res: Response) => {
  const cart = req.cart;
  const response = await payCartSVC(cart);
  return res.status(200).json(response);
};

export default payCartCTRL;
