import IDayOfTheWeek from "../../../shared/interfaces/IDayOfTheWeek";

export default class RestaurantOpeningHours {
    id: number;
    day: IDayOfTheWeek;
    startTime: number;
    endTime: number;
    restaurantId: number;
}
