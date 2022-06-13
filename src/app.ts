import "express-async-errors";
import express from "express";
import { handleError } from "./middlewares";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.use(handleError);

app.listen(process.env.PORT || 3000);
