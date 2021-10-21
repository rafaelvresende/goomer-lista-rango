import "reflect-metadata";

import FakeRestaurantRepository from "../repositories/fakes/FakeRestaurantRepository";
import DeleteRestaurantService from "../services/DeleteRestaurantService";

describe("DeleteRestaurantService", () => {

    it("should be able to delete a restaurant", async () => {

        const fakeRestaurantRepository = new FakeRestaurantRepository();

        const restaurantId = await fakeRestaurantRepository.createRestaurant({
            name: "Sabor e Saúde",
            street: "Av Brasil",
            number: "100",
            neighborhood: "Centro",
            city: "Uberlândia",
            state: "MG",
        });

        const deleteRestaurant = new DeleteRestaurantService(fakeRestaurantRepository);
        await deleteRestaurant.execute({ restaurantId });

        const resultPromise = fakeRestaurantRepository.getRestaurantById(restaurantId);

        await expect(resultPromise).rejects.toThrow();
    });
});
