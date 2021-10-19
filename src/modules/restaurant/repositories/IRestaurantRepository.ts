import Restaurant from "../entities/Restaurant";
import RestaurantOpeningHours from "../entities/RestaurantOpeningHours";
import { IAddOpeningHoursDTO, ICreateRestaurantDTO } from "./dtos/IRestaurantRepositoryDTOs";

export default interface IRestaurantRepository {

    listRestaurants(): Promise<Restaurant[]>;

    createRestaurant({
        name,
        street,
        number,
        neighborhood,
        city,
        state,
    }: ICreateRestaurantDTO): Promise<number>;

    getRestaurantById(id: number): Promise<Restaurant>;

    updateRestaurant({
        id,
        name,
        street,
        number,
        neighborhood,
        city,
        state,
    }: Restaurant): Promise<void>;

    deleteRestaurant(id: number): Promise<void>;

    addOpeningHours({
        day,
        startTime,
        endTime,
        restaurantId,
    }: IAddOpeningHoursDTO): Promise<void>;

    removeOpeningHours(id: number): Promise<void>;

    listOpeningHoursByRestaurant(restaurantId: number): Promise<RestaurantOpeningHours[]>;
}
