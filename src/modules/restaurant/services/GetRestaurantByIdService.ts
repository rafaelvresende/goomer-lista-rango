import { DaysOfTheWeekDescriptions } from "@shared/interfaces/IDayOfTheWeek";
import validateAndFormatTime from "@shared/utils/validateAndFormatTime";
import { injectable, container, inject } from "tsyringe";
import Restaurant from "../entities/Restaurant";
import RestaurantOpeningHours from "../entities/RestaurantOpeningHours";
import IRestaurantRepository from "../repositories/IRestaurantRepository";

interface IRequest {
    restaurantId: number;
}

interface IParsedRestaurantOpeningHours extends RestaurantOpeningHours {
    dayName: string;
}

interface IRestaurantWithOpeningHours extends Restaurant {
    openingHours: IParsedRestaurantOpeningHours[];
}

@injectable()
export default class GetRestaurantByIdService {

    constructor(
        @inject("RestaurantRepository")
        private restaurantRepository: IRestaurantRepository,
    ) { }

    public async execute({
        restaurantId,
    }: IRequest): Promise<IRestaurantWithOpeningHours> {
        
        const restaurant = await this.restaurantRepository.getRestaurantById(restaurantId);

        const openingHours = await this.restaurantRepository.listOpeningHoursByRestaurant(restaurantId);

        const parsedOpeningHours = openingHours.map((openingHours) => {
            const parsedOpeningHours: IParsedRestaurantOpeningHours = {
                ...openingHours,
                dayName: DaysOfTheWeekDescriptions[openingHours.day],
            };
            parsedOpeningHours.startTime = validateAndFormatTime(openingHours.startTime).time;
            parsedOpeningHours.endTime = validateAndFormatTime(openingHours.endTime).time;
            return parsedOpeningHours;
        });

        const restaurantWithOpeningHours: IRestaurantWithOpeningHours = {
            ...restaurant,
            openingHours: parsedOpeningHours,
        }

        return restaurantWithOpeningHours;
    }

    public static resolve() {
        return container.resolve(this);
    }
}
