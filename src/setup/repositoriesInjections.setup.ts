import { container } from "tsyringe";

import IRestaurantRepository from "@modules/restaurant/repositories/IRestaurantRepository";
import RestaurantRepository from "@modules/restaurant/repositories/implementations/RestaurantRepository";

container.registerSingleton<IRestaurantRepository>(
    "RestaurantRepository",
    RestaurantRepository,
);
