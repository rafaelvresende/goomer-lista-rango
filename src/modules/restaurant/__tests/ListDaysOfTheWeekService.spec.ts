import "reflect-metadata";

import ListDaysOfTheWeekService from "../services/ListDaysOfTheWeekService";

describe("ListDaysOfTheWeekService", () => {

    it("should list all days of week", async () => {

        const listDaysOfTheWeek = new ListDaysOfTheWeekService();
        const daysOfTheWeek = await listDaysOfTheWeek.execute();

        expect(daysOfTheWeek.length).toEqual(7);
        expect(daysOfTheWeek[0]).toHaveProperty("name");
        expect(daysOfTheWeek[0]).toHaveProperty("value");
        expect(daysOfTheWeek[0].value).toEqual("sunday");
        expect(daysOfTheWeek[1]).toHaveProperty("name");
        expect(daysOfTheWeek[1]).toHaveProperty("value");
        expect(daysOfTheWeek[1].value).toEqual("monday");
        expect(daysOfTheWeek[2]).toHaveProperty("name");
        expect(daysOfTheWeek[2]).toHaveProperty("value");
        expect(daysOfTheWeek[2].value).toEqual("tuesday");
        expect(daysOfTheWeek[3]).toHaveProperty("name");
        expect(daysOfTheWeek[3]).toHaveProperty("value");
        expect(daysOfTheWeek[3].value).toEqual("wednesday");
        expect(daysOfTheWeek[4]).toHaveProperty("name");
        expect(daysOfTheWeek[4]).toHaveProperty("value");
        expect(daysOfTheWeek[4].value).toEqual("thursday");
        expect(daysOfTheWeek[5]).toHaveProperty("name");
        expect(daysOfTheWeek[5]).toHaveProperty("value");
        expect(daysOfTheWeek[5].value).toEqual("friday");
        expect(daysOfTheWeek[6]).toHaveProperty("name");
        expect(daysOfTheWeek[6]).toHaveProperty("value");
        expect(daysOfTheWeek[6].value).toEqual("saturday");
    });
});
