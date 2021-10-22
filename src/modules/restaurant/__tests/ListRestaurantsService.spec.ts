import "reflect-metadata";

import FakeRestaurantRepository from "../repositories/fakes/FakeRestaurantRepository";
import ListRestaurantsService from "../services/ListRestaurantsService";

describe("ListRestaurantsService", () => {

    it("should be able to list all restaurants", async () => {

        const fakeRestaurantRepository = new FakeRestaurantRepository();

        await fakeRestaurantRepository.createRestaurant({
            name: "Sabor e Saúde",
            street: "Av Brasil",
            number: "100",
            neighborhood: "Centro",
            city: "Uberlândia",
            state: "MG",
        });
        await fakeRestaurantRepository.createRestaurant({
            name: "Fogão de Lenha",
            street: "Av Getúlio Vargas",
            number: "2000",
            neighborhood: "Brasil",
            city: "Uberlândia",
            state: "MG",
        });

        const listRestaurants = new ListRestaurantsService(fakeRestaurantRepository);
        const restaurants = await listRestaurants.execute();

        expect(restaurants.length).toEqual(2);
        expect(restaurants[0]).toHaveProperty("id");
        expect(restaurants[0]).toHaveProperty("name");
        expect(restaurants[0]).toHaveProperty("street");
        expect(restaurants[0]).toHaveProperty("number");
        expect(restaurants[0]).toHaveProperty("neighborhood");
        expect(restaurants[0]).toHaveProperty("city");
        expect(restaurants[0]).toHaveProperty("state");
        expect(restaurants[0].id).toBeGreaterThan(0);
        expect(restaurants[0].name).toEqual("Sabor e Saúde");
        expect(restaurants[0].street).toEqual("Av Brasil");
        expect(restaurants[0].number).toEqual("100");
        expect(restaurants[0].neighborhood).toEqual("Centro");
        expect(restaurants[0].city).toEqual("Uberlândia");
        expect(restaurants[0].state).toEqual("MG");
        expect(restaurants[1]).toHaveProperty("id");
        expect(restaurants[1]).toHaveProperty("name");
        expect(restaurants[1]).toHaveProperty("street");
        expect(restaurants[1]).toHaveProperty("number");
        expect(restaurants[1]).toHaveProperty("neighborhood");
        expect(restaurants[1]).toHaveProperty("city");
        expect(restaurants[1]).toHaveProperty("state");
        expect(restaurants[1].id).toBeGreaterThan(0);
        expect(restaurants[1].name).toEqual("Fogão de Lenha");
        expect(restaurants[1].street).toEqual("Av Getúlio Vargas");
        expect(restaurants[1].number).toEqual("2000");
        expect(restaurants[1].neighborhood).toEqual("Brasil");
        expect(restaurants[1].city).toEqual("Uberlândia");
        expect(restaurants[1].state).toEqual("MG");
    });
});
