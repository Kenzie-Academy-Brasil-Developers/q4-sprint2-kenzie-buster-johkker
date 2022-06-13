import { Router } from "express";

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
