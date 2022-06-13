import { Router } from "express";
import {
  createDvdCTRL,
  createUserCTRL,
  getUsersCTRL,
  userLoginCTRL,
  getDvdsCTRL,
  addDvdToCartCTRL,
  payCartCTRL,
} from "../controllers";
import { validateAuth } from "../middlewares";
import validateAdm from "../middlewares/validateAdm.middleware";
import validateDvd from "../middlewares/validateDvd.middleware";
import validateForms from "../middlewares/validateForm.middleware";
import {
  createUserSchema,
  userLoginSchema,
  createDvdSchema,
  addDvdToCartSchema,
} from "../schemas";
import cartRoutes from "./cart.routes";
import dvdRoutes from "./dvd.routes";
import userRoutes from "./user.routes";

const routes = Router();

routes.use("/api", userRoutes);

//Dvds routes
routes.use("/api", dvdRoutes);

//Carts routes
routes.use("/api", cartRoutes);

export default routes;
