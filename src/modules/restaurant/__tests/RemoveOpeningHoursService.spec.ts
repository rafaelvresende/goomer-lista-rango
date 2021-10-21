import "reflect-metadata";

import FakeRestaurantRepository from "../repositories/fakes/FakeRestaurantRepository";
import RemoveOpeningHoursService from "../services/RemoveOpeningHoursService";

describe("RemoveOpeningHoursService", () => {

    it("should be able to remove a restaurant opening hours information", async () => {

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

        const previousOpeningHours = await fakeRestaurantRepository.listOpeningHoursByRestaurant(restaurantId);
        const openingHoursToRemoveId = previousOpeningHours[2].id;

        const removeOpeningHours = new RemoveOpeningHoursService(fakeRestaurantRepository);
        await removeOpeningHours.execute({ openingHoursId: openingHoursToRemoveId });

        const newOpeningHours = await fakeRestaurantRepository.listOpeningHoursByRestaurant(restaurantId);

        expect(newOpeningHours.length).toEqual(2);
        expect(newOpeningHours[0]).toHaveProperty("id");
        expect(newOpeningHours[0].id).toBeGreaterThan(0);
        expect(newOpeningHours[0]).toHaveProperty("day");
        expect(newOpeningHours[0].day).toEqual("monday");
        expect(newOpeningHours[0]).toHaveProperty("startTime");
        expect(newOpeningHours[0].startTime).toEqual("11:00");
        expect(newOpeningHours[0]).toHaveProperty("endTime");
        expect(newOpeningHours[0].endTime).toEqual("15:00");
        expect(newOpeningHours[0]).toHaveProperty("restaurantId");
        expect(newOpeningHours[0].restaurantId).toEqual(restaurantId);
        expect(newOpeningHours[1]).toHaveProperty("id");
        expect(newOpeningHours[1].id).toBeGreaterThan(0);
        expect(newOpeningHours[1]).toHaveProperty("day");
        expect(newOpeningHours[1].day).toEqual("tuesday");
        expect(newOpeningHours[1]).toHaveProperty("startTime");
        expect(newOpeningHours[1].startTime).toEqual("11:00");
        expect(newOpeningHours[1]).toHaveProperty("endTime");
        expect(newOpeningHours[1].endTime).toEqual("15:00");
        expect(newOpeningHours[1]).toHaveProperty("restaurantId");
        expect(newOpeningHours[1].restaurantId).toEqual(restaurantId);
    });
});
