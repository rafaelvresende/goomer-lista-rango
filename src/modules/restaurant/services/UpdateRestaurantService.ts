import { injectable, container, inject } from "tsyringe";
import IRestaurantRepository from "../repositories/IRestaurantRepository";

interface IRequest {
    id: number;
    name?: string;
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
}

@injectable()
export default class UpdateRestaurantService {

    constructor(
        @inject("RestaurantRepository")
        private restaurantRepository: IRestaurantRepository,
    ) { }

    public async execute({
        id,
        name,
        street,
        number,
        neighborhood,
        city,
        state,
    }: IRequest): Promise<void> {
        
        const restaurant = await this.restaurantRepository.getRestaurantById(id);

        if (name) restaurant.name = name;
        if (street) restaurant.street = street;
        if (number) restaurant.number = number;
        if (neighborhood) restaurant.neighborhood = neighborhood;
        if (city) restaurant.city = city;
        if (state) restaurant.state = state;

        await this.restaurantRepository.updateRestaurant(restaurant);
    }

    public static resolve() {
        return container.resolve(this);
    }
}
