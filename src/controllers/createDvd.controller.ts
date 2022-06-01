import { Request, Response } from "express";
import { createDvdSVC } from "../services";

const createDvdCTRL = async (req: Request, res: Response) => {
  const dvd = await createDvdSVC(req.newInput, req.adm);
  return res.status(201).json(dvd);
};

export default createDvdCTRL;
