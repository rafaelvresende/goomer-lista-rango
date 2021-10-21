import IDayOfTheWeek, { DaysOfTheWeekDescriptions, ValidDaysOfTheWeekList } from "../../../shared/interfaces/IDayOfTheWeek";
import { injectable, container } from "tsyringe";

interface IDayOfTheWeekObject {
    name: string;
    value: IDayOfTheWeek;
}

@injectable()
export default class ListDaysOfTheWeekService {

    constructor() { }

    public async execute(): Promise<IDayOfTheWeekObject[]> {

        const daysOfTheWeekObjects = ValidDaysOfTheWeekList.map((dayValue) => {

            const dayOfTheWeekObject: IDayOfTheWeekObject = {
                name: DaysOfTheWeekDescriptions[dayValue],
                value: dayValue,
            };

            return dayOfTheWeekObject;
        });

        return daysOfTheWeekObjects;
    }

    public static resolve() {
        return container.resolve(this);
    }
}
