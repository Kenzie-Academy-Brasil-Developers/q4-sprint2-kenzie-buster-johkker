import { Router } from "express";
import { addDvdToCartCTRL, createDvdCTRL, getDvdsCTRL } from "../controllers";
import { validateAuth } from "../middlewares";
import validateAdm from "../middlewares/validateAdm.middleware";
import validateDvd from "../middlewares/validateDvd.middleware";
import validateForms from "../middlewares/validateForm.middleware";
import { addDvdToCartSchema, createDvdSchema } from "../schemas";

const dvdRoutes = Router();

dvdRoutes.post(
  "/dvds/register",
  validateForms(createDvdSchema),
  validateAdm,
  createDvdCTRL
);
dvdRoutes.get("/dvds", getDvdsCTRL);
dvdRoutes.post(
  "/dvds/buy/:id",
  validateForms(addDvdToCartSchema),
  validateAuth,
  validateDvd,
  addDvdToCartCTRL
);

export default dvdRoutes;
