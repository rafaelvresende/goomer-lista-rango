import { Router } from "express";

import RestaurantController from "@modules/restaurant/controllers/RestaurantController";
const restaurantController = new RestaurantController();

const restaurantRouter = Router();

restaurantRouter.get(
    "/",
    restaurantController.listRestaurants,
);

restaurantRouter.get(
    "/daysOfTheWeek",
    restaurantController.listDaysOfTheWeek,
);

restaurantRouter.post(
    "/restaurant",
    restaurantController.createRestaurant,
);

restaurantRouter.get(
    "/restaurant",
    restaurantController.getRestaurant,
);

restaurantRouter.put(
    "/restaurant",
    restaurantController.updateRestaurant,
);

restaurantRouter.delete(
    "/restaurant",
    restaurantController.deleteRestaurant,
);

restaurantRouter.post(
    "/restaurant/openingHours",
    restaurantController.addOpeningHours,
);

restaurantRouter.delete(
    "/restaurant/openingHours",
    restaurantController.removeOpeningHours,
);

export { restaurantRouter };
