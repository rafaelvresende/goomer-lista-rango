import { Router } from "express";

import { restaurantRouter } from "@modules/restaurant/routes/restaurant.routes";
import { productRouter } from "@modules/product/routes/product.routes";

const routes = Router();

routes.use("/restaurants", restaurantRouter);
routes.use("/products", productRouter);

export { routes };
