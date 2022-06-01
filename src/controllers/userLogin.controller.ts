import { Request, Response } from "express";
import { userLoginSVC } from "../services";

const userLoginCTRL = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await userLoginSVC(email, password);
  return res.status(200).json({ token: token });
};

export default userLoginCTRL;
