import { injectable, container, inject } from "tsyringe";
import IRestaurantRepository from "../repositories/IRestaurantRepository";

interface IRequest {
    restaurantId: number;
}

@injectable()
export default class DeleteRestaurantService {

    constructor(
        @inject("RestaurantRepository")
        private restaurantRepository: IRestaurantRepository,
    ) { }

    public async execute({
        restaurantId,
    }: IRequest): Promise<void> {
        
        await this.restaurantRepository.deleteRestaurant(restaurantId);
    }

    public static resolve() {
        return container.resolve(this);
    }
}
