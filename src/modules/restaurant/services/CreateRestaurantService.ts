import { injectable, container, inject } from "tsyringe";
import IRestaurantRepository from "../repositories/IRestaurantRepository";

interface IRequest {
    name: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
}

@injectable()
export default class CreateRestaurantService {

    constructor(
        @inject("RestaurantRepository")
        private restaurantRepository: IRestaurantRepository,
    ) { }

    public async execute({
        name,
        street,
        number,
        neighborhood,
        city,
        state,
    }: IRequest): Promise<number> {
        
        const restaurantId = await this.restaurantRepository.createRestaurant({
            name,
            street,
            number,
            neighborhood,
            city,
            state,
        });

        return restaurantId;
    }

    public static resolve() {
        return container.resolve(this);
    }
}
