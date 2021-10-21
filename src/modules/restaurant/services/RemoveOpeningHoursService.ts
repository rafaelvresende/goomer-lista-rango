import { injectable, container, inject } from "tsyringe";
import IRestaurantRepository from "../repositories/IRestaurantRepository";

interface IRequest {
    openingHoursId: number;
}

@injectable()
export default class RemoveOpeningHoursService {

    constructor(
        @inject("RestaurantRepository")
        private restaurantRepository: IRestaurantRepository,
    ) { }

    public async execute({
        openingHoursId,
    }: IRequest): Promise<void> {
        
        await this.restaurantRepository.removeOpeningHours(openingHoursId);
    }

    public static resolve() {
        return container.resolve(this);
    }
}
