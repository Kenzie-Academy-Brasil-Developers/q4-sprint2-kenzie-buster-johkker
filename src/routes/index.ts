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

const routes = Router();

//User routes
routes.post(
  "/users/register",
  validateForms(createUserSchema),
  // validateAdm,
  createUserCTRL
);
routes.post("/users/login", validateForms(userLoginSchema), userLoginCTRL);
routes.get("/users", getUsersCTRL);

//Dvds routes
routes.post(
  "/dvds/register",
  validateForms(createDvdSchema),
  validateAdm,
  createDvdCTRL
);
routes.get("/dvds", getDvdsCTRL);
routes.post(
  "/dvds/buy/:id",
  validateForms(addDvdToCartSchema),
  validateAuth,
  validateDvd,
  addDvdToCartCTRL
);

//Carts routes
routes.put("/carts/pay", validateAuth, payCartCTRL);

export default routes;
