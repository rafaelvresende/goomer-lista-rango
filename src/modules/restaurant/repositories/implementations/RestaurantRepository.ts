import db from "../../../../utils/databaseConnection";

import { IAddOpeningHoursDTO, ICreateRestaurantDTO, IUpdateRestaurantDTO } from "../dtos/IRestaurantRepositoryDTOs";
import IRestaurantRepository from "../IRestaurantRepository";

import Restaurant from "../../entities/Restaurant";
import RestaurantOpeningHours from "../../entities/RestaurantOpeningHours";

import * as RestaurantViews from "../../views/restaurant.views";
import * as RestaurantOpeningHoursViews from "../../views/restaurantOpeningHours.views";

export default class RestaurantRepository implements IRestaurantRepository {

    public async listRestaurants(): Promise<Restaurant[]> {

        const restaurants: any[] = [];

        try {

            const [rows, fields] = await db.execute("SELECT * FROM restaurant;");
            if (Array.isArray(rows)) restaurants.push(...rows);

        } catch(error) {
            console.log(error);
        }

        return RestaurantViews.formatAllToEntities(restaurants);
    }

    public async createRestaurant({
        name,
        street,
        number,
        neighborhood,
        city,
        state,
    }: ICreateRestaurantDTO): Promise<void> {

        try {

            await db.execute(`
                INSERT INTO restaurant
                (name, street, number, neighborhood, city, state)
                VALUES ('${name}', '${street}', '${number}', '${neighborhood}', '${city}', '${state}');
            `);

        } catch(error) {
            console.log(error);
        }
    }

    public async getRestaurantById(id: number): Promise<Restaurant|undefined> {

        try {

            const [rows, fields] = await db.execute(`SELECT * FROM restaurant WHERE id = ${id};`);
            return Array.isArray(rows) && rows.length > 0 ? RestaurantViews.formatToEntity(rows[0]) : undefined;

        } catch(error) {
            console.log(error);
            return undefined;
        }        
    }

    public async updateRestaurant({
        id,
        name,
        street,
        number,
        neighborhood,
        city,
        state,
    }: IUpdateRestaurantDTO): Promise<void> {

        try {

            await db.execute(`
                UPDATE restaurant
                SET name = '${name}', street = '${street}', number = '${number}', neighborhood = '${neighborhood}', city = '${city}', state = '${state}'
                WHERE id = ${id};
            `);

        } catch(error) {
            console.log(error);
        }
    }

    public async deleteRestaurant(id: number): Promise<void> {

        try {

            await db.execute(`DELETE FROM restaurant WHERE id = ${id};`);

        } catch(error) {
            console.log(error);
        }
    }

    public async addOpeningHours({
        day,
        startTime,
        endTime,
        restaurantId,
    }: IAddOpeningHoursDTO): Promise<void> {

        try {

            await db.execute(`
                INSERT INTO opening_hours
                (day, start_time, end_time, restaurant_id)
                VALUES ('${day}', '${startTime}', '${endTime}', ${restaurantId});
            `);

        } catch(error) {
            console.log(error);
        }
    }

    public async removeOpeningHours(id: number): Promise<void> {

        try {

            await db.execute(`DELETE FROM opening_hours WHERE id = ${id};`);

        } catch(error) {
            console.log(error);
        }
    }

    public async listOpeningHoursByRestaurant(restaurantId: number): Promise<RestaurantOpeningHours[]> {

        const openingHours: any[] = [];

        try {

            const [rows, fields] = await db.execute(`SELECT * FROM opening_hours WHERE restaurant_id = ${restaurantId};`);
            if (Array.isArray(rows)) openingHours.push(...rows);

        } catch(error) {
            console.log(error);
        }

        return RestaurantOpeningHoursViews.formatAllToEntities(openingHours);
    }
}
