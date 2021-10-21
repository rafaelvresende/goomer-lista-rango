import { IProductCategory } from "@modules/product/entities/Product";
import IDayOfTheWeek from "@shared/interfaces/IDayOfTheWeek";

export interface IListProductsByRestaurant {
    restaurantId: number;
}

export interface ICreateProductDTO {
    name: string;
    value: number;
    category: IProductCategory;
    restaurantId: number;
}

export interface IAddPromotionHoursDTO {
    day: IDayOfTheWeek;
    startTime: string;
    endTime: string;
    productId: number;
}
