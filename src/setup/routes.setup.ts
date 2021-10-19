import { Router } from "express";

import { restaurantRouter } from "@modules/restaurant/routes/restaurant.routes";

const routes = Router();

routes.use("/restaurants", restaurantRouter);

export { routes };
