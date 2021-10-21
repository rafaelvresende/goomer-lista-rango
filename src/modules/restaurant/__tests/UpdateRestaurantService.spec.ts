import "reflect-metadata";

import FakeRestaurantRepository from "../repositories/fakes/FakeRestaurantRepository";
import UpdateRestaurantService from "../services/UpdateRestaurantService";

describe("UpdateRestaurantService", () => {

    it("should be able to update values of name, street and number, and maintain values of neighborhood, city and state", async () => {

        const fakeRestaurantRepository = new FakeRestaurantRepository();

        const restaurantId = await fakeRestaurantRepository.createRestaurant({
            name: "Nome Antigo",
            street: "Rua Antiga",
            number: "Nro Antigo",
            neighborhood: "Bairro Antigo",
            city: "Cidade Antiga",
            state: "Estado Antigo",
        });

        const updateRestaurant = new UpdateRestaurantService(fakeRestaurantRepository);
        await updateRestaurant.execute({
            id: restaurantId,
            name: "Nome Novo",
            street: "Rua Nova",
            number: "Nro Novo",
        });

        const updatedRestaurant = await fakeRestaurantRepository.getRestaurantById(restaurantId);

        expect(updatedRestaurant).toHaveProperty("id");
        expect(updatedRestaurant.id).toEqual(restaurantId);
        expect(updatedRestaurant).toHaveProperty("name");
        expect(updatedRestaurant.name).toEqual("Nome Novo");
        expect(updatedRestaurant).toHaveProperty("street");
        expect(updatedRestaurant.street).toEqual("Rua Nova");
        expect(updatedRestaurant).toHaveProperty("number");
        expect(updatedRestaurant.number).toEqual("Nro Novo");
        expect(updatedRestaurant).toHaveProperty("neighborhood");
        expect(updatedRestaurant.neighborhood).toEqual("Bairro Antigo");
        expect(updatedRestaurant).toHaveProperty("city");
        expect(updatedRestaurant.city).toEqual("Cidade Antiga");
        expect(updatedRestaurant).toHaveProperty("state");
        expect(updatedRestaurant.state).toEqual("Estado Antigo");
    });

    it("should be able to update values of neighborhood, city and state, and maintain values of name, street and number", async () => {

        const fakeRestaurantRepository = new FakeRestaurantRepository();

        const restaurantId = await fakeRestaurantRepository.createRestaurant({
            name: "Nome Antigo",
            street: "Rua Antiga",
            number: "Nro Antigo",
            neighborhood: "Bairro Antigo",
            city: "Cidade Antiga",
            state: "Estado Antigo",
        });

        const updateRestaurant = new UpdateRestaurantService(fakeRestaurantRepository);
        await updateRestaurant.execute({
            id: restaurantId,
            neighborhood: "Bairro Novo",
            city: "Cidade Nova",
            state: "Estado Novo",
        });

        const updatedRestaurant = await fakeRestaurantRepository.getRestaurantById(restaurantId);

        expect(updatedRestaurant).toHaveProperty("id");
        expect(updatedRestaurant.id).toEqual(restaurantId);
        expect(updatedRestaurant).toHaveProperty("name");
        expect(updatedRestaurant.name).toEqual("Nome Antigo");
        expect(updatedRestaurant).toHaveProperty("street");
        expect(updatedRestaurant.street).toEqual("Rua Antiga");
        expect(updatedRestaurant).toHaveProperty("number");
        expect(updatedRestaurant.number).toEqual("Nro Antigo");
        expect(updatedRestaurant).toHaveProperty("neighborhood");
        expect(updatedRestaurant.neighborhood).toEqual("Bairro Novo");
        expect(updatedRestaurant).toHaveProperty("city");
        expect(updatedRestaurant.city).toEqual("Cidade Nova");
        expect(updatedRestaurant).toHaveProperty("state");
        expect(updatedRestaurant.state).toEqual("Estado Novo");
    });
});
