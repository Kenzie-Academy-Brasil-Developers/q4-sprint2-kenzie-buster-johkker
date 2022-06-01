import { Request, Response } from "express";

import { createUserSVC } from "../services";

const createUserCTRL = async (req: Request, res: Response) => {
  const user = await createUserSVC(req.newInput, req.adm);
  return res.status(201).json({ user });
};

export default createUserCTRL;
