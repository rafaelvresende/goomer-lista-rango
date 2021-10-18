import Restaurant from "../entities/Restaurant";
import RestaurantOpeningHours from "../entities/RestaurantOpeningHours";
import { IAddOpeningHoursDTO, ICreateRestaurantDTO, IUpdateRestaurantDTO } from "./dtos/IRestaurantRepositoryDTOs";

export default interface IRestaurantRepository {

    listRestaurants(): Promise<Restaurant[]>;

    createRestaurant({
        name,
        street,
        number,
        neighborhood,
        city,
        state,
    }: ICreateRestaurantDTO): Promise<void>;

    getRestaurantById(id: number): Promise<Restaurant|undefined>;

    updateRestaurant({
        id,
        name,
        street,
        number,
        neighborhood,
        city,
        state,
    }: IUpdateRestaurantDTO): Promise<void>;

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
