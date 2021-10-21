import IDayOfTheWeek from "@shared/interfaces/IDayOfTheWeek";

export default class ProductPromotionHours {
    id: number;
    day: IDayOfTheWeek;
    startTime: string;
    endTime: string;
    productId: number;
}
