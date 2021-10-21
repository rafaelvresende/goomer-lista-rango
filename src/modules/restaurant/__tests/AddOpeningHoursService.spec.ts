import IDayOfTheWeek from "../../../shared/interfaces/IDayOfTheWeek";
import "reflect-metadata";

import FakeRestaurantRepository from "../repositories/fakes/FakeRestaurantRepository";
import AddOpeningHoursService from "../services/AddOpeningHoursService";

describe("AddOpeningHoursService", () => {

    it("should not accept opening hours without the days of the week", async () => {

        const fakeRestaurantRepository = new FakeRestaurantRepository();

        const restaurantId = await fakeRestaurantRepository.createRestaurant({
            name: "Sabor e Saúde",
            street: "Av Brasil",
            number: "100",
            neighborhood: "Centro",
            city: "Uberlândia",
            state: "MG",
        });

        const addOpeningHours = new AddOpeningHoursService(fakeRestaurantRepository);
        const openingHoursPromise = addOpeningHours.execute({
            days: [],
            startTime: "10:00",
            endTime: "15:00",
            restaurantId,
        });

        await expect(openingHoursPromise).rejects.toThrow();
    });

    it("should not accept wrong day of week", async () => {

        const fakeRestaurantRepository = new FakeRestaurantRepository();

        const restaurantId = await fakeRestaurantRepository.createRestaurant({
            name: "Sabor e Saúde",
            street: "Av Brasil",
            number: "100",
            neighborhood: "Centro",
            city: "Uberlândia",
            state: "MG",
        });

        const days = ["segunda"] as unknown as IDayOfTheWeek[];

        const addOpeningHours = new AddOpeningHoursService(fakeRestaurantRepository);
        const openingHoursPromise = addOpeningHours.execute({
            days,
            startTime: "10:00",
            endTime: "15:00",
            restaurantId,
        });

        await expect(openingHoursPromise).rejects.toThrow();
    });

    it("should not accept times without the format hh:mm", async () => {

        const fakeRestaurantRepository = new FakeRestaurantRepository();

        const restaurantId = await fakeRestaurantRepository.createRestaurant({
            name: "Sabor e Saúde",
            street: "Av Brasil",
            number: "100",
            neighborhood: "Centro",
            city: "Uberlândia",
            state: "MG",
        });

        const addOpeningHours = new AddOpeningHoursService(fakeRestaurantRepository);
        const openingHoursPromise = addOpeningHours.execute({
            days: ["monday"],
            startTime: "9:00",
            endTime: "15:00",
            restaurantId,
        });

        await expect(openingHoursPromise).rejects.toThrow();
    });

    it("should not accept times with less than 15 minutes interval", async () => {

        const fakeRestaurantRepository = new FakeRestaurantRepository();

        const restaurantId = await fakeRestaurantRepository.createRestaurant({
            name: "Sabor e Saúde",
            street: "Av Brasil",
            number: "100",
            neighborhood: "Centro",
            city: "Uberlândia",
            state: "MG",
        });

        const addOpeningHours = new AddOpeningHoursService(fakeRestaurantRepository);
        const openingHoursPromise = addOpeningHours.execute({
            days: ["monday"],
            startTime: "12:00",
            endTime: "12:10",
            restaurantId,
        });

        await expect(openingHoursPromise).rejects.toThrow();
    });

    it("should not accept overlapping with previous opening hours", async () => {

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

        const addOpeningHours = new AddOpeningHoursService(fakeRestaurantRepository);
        const openingHoursPromise = addOpeningHours.execute({
            days: ["monday"],
            startTime: "12:00",
            endTime: "16:00",
            restaurantId,
        });

        await expect(openingHoursPromise).rejects.toThrow();
    });

    it("should save valid opening hours for restaurant", async () => {

        const fakeRestaurantRepository = new FakeRestaurantRepository();

        const restaurantId = await fakeRestaurantRepository.createRestaurant({
            name: "Sabor e Saúde",
            street: "Av Brasil",
            number: "100",
            neighborhood: "Centro",
            city: "Uberlândia",
            state: "MG",
        });

        const addOpeningHours = new AddOpeningHoursService(fakeRestaurantRepository);
        await addOpeningHours.execute({
            days: ["monday", "tuesday"],
            startTime: "11:00",
            endTime: "15:00",
            restaurantId,
        });

        const openingHours = await fakeRestaurantRepository.listOpeningHoursByRestaurant(restaurantId);

        expect(openingHours.length).toEqual(2);
        expect(openingHours[0]).toHaveProperty("id");
        expect(openingHours[0].id).toBeGreaterThan(0);
        expect(openingHours[0]).toHaveProperty("day");
        expect(openingHours[0].day).toEqual("monday");
        expect(openingHours[0]).toHaveProperty("startTime");
        expect(openingHours[0].startTime).toEqual("11:00");
        expect(openingHours[0]).toHaveProperty("endTime");
        expect(openingHours[0].endTime).toEqual("15:00");
        expect(openingHours[0]).toHaveProperty("restaurantId");
        expect(openingHours[0].restaurantId).toEqual(restaurantId);
        expect(openingHours[1]).toHaveProperty("id");
        expect(openingHours[1].id).toBeGreaterThan(0);
        expect(openingHours[1]).toHaveProperty("day");
        expect(openingHours[1].day).toEqual("tuesday");
        expect(openingHours[1]).toHaveProperty("startTime");
        expect(openingHours[1].startTime).toEqual("11:00");
        expect(openingHours[1]).toHaveProperty("endTime");
        expect(openingHours[1].endTime).toEqual("15:00");
        expect(openingHours[1]).toHaveProperty("restaurantId");
        expect(openingHours[1].restaurantId).toEqual(restaurantId);
    });
});
