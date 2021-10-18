import IDayOfTheWeek from "../../../../shared/interfaces/IDayOfTheWeek";

export interface ICreateRestaurantDTO {
    name: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
}

export interface IUpdateRestaurantDTO {
    id: number;
    name: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
}

export interface IAddOpeningHoursDTO {
    day: IDayOfTheWeek;
    startTime: string;
    endTime: string;
    restaurantId: number;
}
