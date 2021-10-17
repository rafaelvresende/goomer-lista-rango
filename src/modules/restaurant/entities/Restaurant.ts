import RestaurantOpeningHours from "./RestaurantOpeningHours";

export default class Restaurant {
    id: number;
    name: string;
    photo: File;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    openingHours: RestaurantOpeningHours[];
}
