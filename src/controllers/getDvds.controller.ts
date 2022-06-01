import { Request, Response } from "express";
import { getDvdsSVC } from "../services";

const getDvdsCTRL = async (req: Request, res: Response) => {
  const dvds = await getDvdsSVC();
  return res.status(200).json(dvds);
};

export default getDvdsCTRL;
