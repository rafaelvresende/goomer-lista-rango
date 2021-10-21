import { container } from "tsyringe";

import IRestaurantRepository from "@modules/restaurant/repositories/IRestaurantRepository";
import RestaurantRepository from "@modules/restaurant/repositories/implementations/RestaurantRepository";

import IProductRepository from "@modules/product/repositories/IProductRepository";
import ProductRepository from "@modules/product/repositories/implementations/ProductRepository";

container.registerSingleton<IRestaurantRepository>(
    "RestaurantRepository",
    RestaurantRepository,
);

container.registerSingleton<IProductRepository>(
    "ProductRepository",
    ProductRepository,
);
