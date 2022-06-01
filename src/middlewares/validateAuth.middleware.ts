import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { getToken } from "../utils";
import { AppError, TokenError } from "../errors";
import { cartRepository, userRepository } from "../repositories";

config();

const validateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new AppError("No authorization token provided.", 401);
  }
  const token = getToken(authorization);

  return jwt.verify(
    token,
    String(process.env.DECODER),
    async (error, decoded) => {
      if (!decoded) {
        throw new TokenError("JsonWebTokenError", "jwt malformed", 401);
      }
      req.decoded = decoded;
      const user = await userRepository.findOne({
        where: { email: req.decoded.email },
      });

      if (!user) {
        throw new AppError(
          "Authorization error. Your account may have been deactivated. Contact platform admin.",
          401
        );
      }
      req.user = user;

      const cart = await cartRepository.findOne({
        where: { id: user.cart.id },
      });

      if (!cart) {
        throw new Error();
      }

      req.cart = cart;
      return next();
    }
  );
};

export default validateAuth;
