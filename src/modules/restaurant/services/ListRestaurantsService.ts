import { injectable, container, inject } from "tsyringe";
import Restaurant from "../entities/Restaurant";
import IRestaurantRepository from "../repositories/IRestaurantRepository";

@injectable()
export default class ListRestaurantsService {

    constructor(
        @inject("RestaurantRepository")
        private restaurantRepository: IRestaurantRepository,
    ) { }

    public async execute(): Promise<Restaurant[]> {
        
        const restaurants = await this.restaurantRepository.listRestaurants();

        return restaurants;
    }

    public static resolve() {
        return container.resolve(this);
    }
}
