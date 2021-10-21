import { IAddOpeningHoursDTO, ICreateRestaurantDTO } from "../dtos/IRestaurantRepositoryDTOs";
import IRestaurantRepository from "../IRestaurantRepository";

import Restaurant from "../../entities/Restaurant";
import RestaurantOpeningHours from "../../entities/RestaurantOpeningHours";

export default class FakeRestaurantRepository implements IRestaurantRepository {

    private restaurants: Restaurant[] = [];

    private restaurantOpeningHours: RestaurantOpeningHours[] = [];

    public async listRestaurants(): Promise<Restaurant[]> {

        return this.restaurants;
    }

    public async createRestaurant({
        name,
        street,
        number,
        neighborhood,
        city,
        state,
    }: ICreateRestaurantDTO): Promise<number> {

        let lastId: number = 0;
        this.restaurants.map((restaurant) => {
            if (restaurant.id > lastId) lastId = restaurant.id;
        });

        const restaurant = new Restaurant();

        Object.assign(restaurant, {
            id: lastId + 1,
            name,
            street,
            number,
            neighborhood,
            city,
            state,
        });

        this.restaurants.push(restaurant);

        return restaurant.id;
    }

    public async getRestaurantById(id: number): Promise<Restaurant> {

        const restaurant = this.restaurants.find((rest) => rest.id === id);

        if (!restaurant) throw new Error("Restaurante não encontrado!");

        return restaurant;
    }

    public async updateRestaurant({
        id,
        name,
        street,
        number,
        neighborhood,
        city,
        state,
    }: Restaurant): Promise<void> {

        const restaurant = this.restaurants.find((rest) => rest.id === id);

        if (!restaurant) throw new Error("Restaurante não encontrado!");

        Object.assign(restaurant, {
            name,
            street,
            number,
            neighborhood,
            city,
            state,
        });
    }

    public async deleteRestaurant(id: number): Promise<void> {

        const restaurant = this.restaurants.find((restaurant) => restaurant.id === id);

        if (restaurant) {

            const index = this.restaurants.indexOf(restaurant);

            this.restaurants.splice(index, 1);
        }
    }

    public async addOpeningHours({
        day,
        startTime,
        endTime,
        restaurantId,
    }: IAddOpeningHoursDTO): Promise<void> {

        let lastId: number = 0;
        this.restaurantOpeningHours.map((openingHours) => {
            if (openingHours.id > lastId) lastId = openingHours.id;
        });

        const restaurantOpeningHours = new RestaurantOpeningHours();

        Object.assign(restaurantOpeningHours, {
            id: lastId + 1,
            day,
            startTime,
            endTime,
            restaurantId,
        });

        this.restaurantOpeningHours.push(restaurantOpeningHours);
    }

    public async removeOpeningHours(id: number): Promise<void> {

        const restaurantOpeningHours = this.restaurantOpeningHours.find((openingHours) => openingHours.id === id);

        if (restaurantOpeningHours) {

            const index = this.restaurantOpeningHours.indexOf(restaurantOpeningHours);

            this.restaurantOpeningHours.splice(index, 1);
        }
    }

    public async listOpeningHoursByRestaurant(restaurantId: number): Promise<RestaurantOpeningHours[]> {

        return this.restaurantOpeningHours.filter((openingHours) => openingHours.restaurantId === restaurantId);
    }
}
