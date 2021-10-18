import IDayOfTheWeek from "../../../shared/interfaces/IDayOfTheWeek";

export default class RestaurantOpeningHours {
    id: number;
    day: IDayOfTheWeek;
    startTime: string;
    endTime: string;
    restaurantId: number;
}
