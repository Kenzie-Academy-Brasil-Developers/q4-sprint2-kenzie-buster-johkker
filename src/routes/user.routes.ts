import { Router } from "express";
import { createUserCTRL, getUsersCTRL, userLoginCTRL } from "../controllers";
import validateForms from "../middlewares/validateForm.middleware";
import { createUserSchema, userLoginSchema } from "../schemas";

const userRoutes = Router();

userRoutes.post(
  "/users/register",
  validateForms(createUserSchema),
  // validateAdm,
  createUserCTRL
);
userRoutes.post("/users/login", validateForms(userLoginSchema), userLoginCTRL);
userRoutes.get("/users", getUsersCTRL);

export default userRoutes;
