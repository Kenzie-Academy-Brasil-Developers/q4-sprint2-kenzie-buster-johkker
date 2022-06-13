import { Router } from "express";
import { payCartCTRL } from "../controllers";
import { validateAuth } from "../middlewares";

const cartRoutes = Router();

cartRoutes.put("/carts/pay", validateAuth, payCartCTRL);

export default cartRoutes;
