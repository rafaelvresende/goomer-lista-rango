import "reflect-metadata";

import FakeRestaurantRepository from "../repositories/fakes/FakeRestaurantRepository";
import GetRestaurantByIdService from "../services/GetRestaurantByIdService";

describe("GetRestaurantByIdService", () => {

    it("should be able to load a restaurant information", async () => {

        const fakeRestaurantRepository = new FakeRestaurantRepository();

        const restaurantId = await fakeRestaurantRepository.createRestaurant({
            name: "Sabor e Saúde",
            street: "Av Brasil",
            number: "100",
            neighborhood: "Centro",
            city: "Uberlândia",
            state: "MG",
        });

        await fakeRestaurantRepository.addOpeningHours({
            day: "monday",
            startTime: "11:00",
            endTime: "15:00",
            restaurantId,
        });
        await fakeRestaurantRepository.addOpeningHours({
            day: "tuesday",
            startTime: "11:00",
            endTime: "15:00",
            restaurantId,
        });
        await fakeRestaurantRepository.addOpeningHours({
            day: "wednesday",
            startTime: "11:00",
            endTime: "15:00",
            restaurantId,
        });

        const getRestaurantById = new GetRestaurantByIdService(fakeRestaurantRepository);
        const restaurant = await getRestaurantById.execute({ restaurantId });

        expect(restaurant).toHaveProperty("id");
        expect(restaurant.id).toBeGreaterThan(0);
        expect(restaurant).toHaveProperty("name");
        expect(restaurant.name).toEqual("Sabor e Saúde");
        expect(restaurant).toHaveProperty("street");
        expect(restaurant.street).toEqual("Av Brasil");
        expect(restaurant).toHaveProperty("number");
        expect(restaurant.number).toEqual("100");
        expect(restaurant).toHaveProperty("neighborhood");
        expect(restaurant.neighborhood).toEqual("Centro");
        expect(restaurant).toHaveProperty("city");
        expect(restaurant.city).toEqual("Uberlândia");
        expect(restaurant).toHaveProperty("state");
        expect(restaurant.state).toEqual("MG");
        expect(restaurant).toHaveProperty("openingHours");
        expect(restaurant.openingHours.length).toEqual(3);
        expect(restaurant.openingHours[0]).toHaveProperty("id");
        expect(restaurant.openingHours[0].id).toBeGreaterThan(0);
        expect(restaurant.openingHours[0]).toHaveProperty("day");
        expect(restaurant.openingHours[0].day).toEqual("monday");
        expect(restaurant.openingHours[0]).toHaveProperty("startTime");
        expect(restaurant.openingHours[0].startTime).toEqual("11:00");
        expect(restaurant.openingHours[0]).toHaveProperty("endTime");
        expect(restaurant.openingHours[0].endTime).toEqual("15:00");
        expect(restaurant.openingHours[0]).toHaveProperty("restaurantId");
        expect(restaurant.openingHours[0].restaurantId).toEqual(restaurant.id);
        expect(restaurant.openingHours[0]).toHaveProperty("dayName");
        expect(restaurant.openingHours[0].dayName).toEqual("Segunda-feira");
        expect(restaurant.openingHours[1]).toHaveProperty("id");
        expect(restaurant.openingHours[1].id).toBeGreaterThan(0);
        expect(restaurant.openingHours[1]).toHaveProperty("day");
        expect(restaurant.openingHours[1].day).toEqual("tuesday");
        expect(restaurant.openingHours[1]).toHaveProperty("startTime");
        expect(restaurant.openingHours[1].startTime).toEqual("11:00");
        expect(restaurant.openingHours[1]).toHaveProperty("endTime");
        expect(restaurant.openingHours[1].endTime).toEqual("15:00");
        expect(restaurant.openingHours[1]).toHaveProperty("restaurantId");
        expect(restaurant.openingHours[1].restaurantId).toEqual(restaurant.id);
        expect(restaurant.openingHours[1]).toHaveProperty("dayName");
        expect(restaurant.openingHours[1].dayName).toEqual("Terça-feira");
        expect(restaurant.openingHours[2]).toHaveProperty("id");
        expect(restaurant.openingHours[2].id).toBeGreaterThan(0);
        expect(restaurant.openingHours[2]).toHaveProperty("day");
        expect(restaurant.openingHours[2].day).toEqual("wednesday");
        expect(restaurant.openingHours[2]).toHaveProperty("startTime");
        expect(restaurant.openingHours[2].startTime).toEqual("11:00");
        expect(restaurant.openingHours[2]).toHaveProperty("endTime");
        expect(restaurant.openingHours[2].endTime).toEqual("15:00");
        expect(restaurant.openingHours[2]).toHaveProperty("restaurantId");
        expect(restaurant.openingHours[2].restaurantId).toEqual(restaurant.id);
        expect(restaurant.openingHours[2]).toHaveProperty("dayName");
        expect(restaurant.openingHours[2].dayName).toEqual("Quarta-feira");
    });
});
