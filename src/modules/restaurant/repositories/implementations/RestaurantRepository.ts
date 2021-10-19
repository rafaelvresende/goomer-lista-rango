import db from "@shared/utils/databaseConnection";

import { IAddOpeningHoursDTO, ICreateRestaurantDTO } from "../dtos/IRestaurantRepositoryDTOs";
import IRestaurantRepository from "../IRestaurantRepository";

import Restaurant from "../../entities/Restaurant";
import RestaurantOpeningHours from "../../entities/RestaurantOpeningHours";

import * as RestaurantViews from "../../views/restaurant.views";
import * as RestaurantOpeningHoursViews from "../../views/restaurantOpeningHours.views";

import { ResultSetHeader } from "mysql2";

export default class RestaurantRepository implements IRestaurantRepository {

    public async listRestaurants(): Promise<Restaurant[]> {

        try {

            const restaurants: any[] = [];

            const [rows, fields] = await db.execute("SELECT * FROM restaurant;");
            if (Array.isArray(rows)) restaurants.push(...rows);

            return RestaurantViews.formatAllToEntities(restaurants);

        } catch(error) {
            console.log(error);
            throw new Error("Falha ao buscar restaurantes!");
        }
    }

    public async createRestaurant({
        name,
        street,
        number,
        neighborhood,
        city,
        state,
    }: ICreateRestaurantDTO): Promise<number> {

        try {

            const [ resultSetHeader ] = await db.execute(`
                INSERT INTO restaurant
                (name, street, number, neighborhood, city, state)
                VALUES ('${name}', '${street}', '${number}', '${neighborhood}', '${city}', '${state}');
            `);

            const id = ((resultSetHeader as ResultSetHeader).insertId);

            return id;

        } catch(error) {
            console.log(error);
            throw new Error("Falha ao criar restaurante!");
        }
    }

    public async getRestaurantById(id: number): Promise<Restaurant> {

        try {

            const [rows, fields] = await db.execute(`SELECT * FROM restaurant WHERE id = ${id};`);

            if (!(Array.isArray(rows) && rows.length > 0)) throw new Error("Restaurante não encontrado!");

            return RestaurantViews.formatToEntity(rows[0]);

        } catch(error) {
            console.log(error);
            throw new Error("Restaurante não encontrado!");
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
    }: Restaurant): Promise<void> {

        try {

            await db.execute(`
                UPDATE restaurant
                SET name = '${name}', street = '${street}', number = '${number}', neighborhood = '${neighborhood}', city = '${city}', state = '${state}'
                WHERE id = ${id};
            `);

        } catch(error) {
            console.log(error);
            throw new Error("Falha ao atualizar os dados do restaurante!");
        }
    }

    public async deleteRestaurant(id: number): Promise<void> {

        try {

            await db.execute(`DELETE FROM restaurant WHERE id = ${id};`);

        } catch(error) {
            console.log(error);
            throw new Error("Falha ao excluir restaurante!");
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
            throw new Error("Falha ao adicionar horário de funcionamento!");
        }
    }

    public async removeOpeningHours(id: number): Promise<void> {

        try {

            await db.execute(`DELETE FROM opening_hours WHERE id = ${id};`);

        } catch(error) {
            console.log(error);
            throw new Error("Falha ao remover horário de funcionamento!");
        }
    }

    public async listOpeningHoursByRestaurant(restaurantId: number): Promise<RestaurantOpeningHours[]> {

        try {

            const openingHours: any[] = [];

            const [rows, fields] = await db.execute(`SELECT * FROM opening_hours WHERE restaurant_id = ${restaurantId};`);
            if (Array.isArray(rows)) openingHours.push(...rows);

            return RestaurantOpeningHoursViews.formatAllToEntities(openingHours);

        } catch(error) {
            console.log(error);
            throw new Error("Falha ao buscar horários de funcionamento!");
        }
    }
}
