import "reflect-metadata";

import FakeRestaurantRepository from "../repositories/fakes/FakeRestaurantRepository";
import CreateRestaurantService from "../services/CreateRestaurantService";

describe("CreateRestaurantService", () => {

    it("should be able to save a new restaurant", async () => {

        const fakeRestaurantRepository = new FakeRestaurantRepository();

        const createRestaurant = new CreateRestaurantService(fakeRestaurantRepository);

        const restaurantId = await createRestaurant.execute({
            name: "Sabor e Saúde",
            street: "Av Brasil",
            number: "100",
            neighborhood: "Centro",
            city: "Uberlândia",
            state: "MG",
        });

        expect(restaurantId).toBeGreaterThan(0);
    });
});
