import { ValidDaysOfTheWeekList } from "@shared/interfaces/IDayOfTheWeek";
import getTimeIntervalDuration from "@shared/utils/getTimeIntervalDuration";
import validateAndFormatTime from "@shared/utils/validateAndFormatTime";
import { injectable, container, inject } from "tsyringe";
import Product from "../entities/Product";
import ProductPromotionHours from "../entities/ProductPromotionHours";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest {
    restaurantId: number;
}

interface IParsedProduct extends Product {
    currentValue: number;
}

@injectable()
export default class ListProductsByRestaurantService {

    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository,
    ) { }

    public async execute({
        restaurantId,
    }: IRequest): Promise<IParsedProduct[]> {
        
        const products = await this.productRepository.listProductsByRestaurant({ restaurantId });

        const productsIds = products.map((product) => product.id);

        let allPromotionHours: ProductPromotionHours[] = [];
        if (productsIds.length > 0) {
            allPromotionHours = await this.productRepository.listPromotionHoursByMultipleProducts(productsIds);
        }

        const now = new Date();
        const todayIndex = now.getDay();
        const today = ValidDaysOfTheWeekList[todayIndex];
        const nowMinutes = now.getMinutes();
        const nowHours = now.getHours();
        const nowTimeInMinutes = (nowHours * 60) + nowMinutes;

        const allPromotionHoursValidForToday = allPromotionHours.filter((promoHour) => promoHour.day === today);

        const parsedProducts = products.map((product) => {

            let currentValue: number;
            if (product.promotionDescription && product.promotionValue) {
                const productPromotionHours = allPromotionHoursValidForToday.filter((promoHour) => promoHour.productId === product.id);
                currentValue = this.checkSomePromotionForNow(productPromotionHours, nowTimeInMinutes) ? product.promotionValue : product.value;
            } else {
                currentValue = product.value;
            }

            const parsedProduct: IParsedProduct = {
                ...product,
                currentValue,
            };

            return parsedProduct;
        });

        return parsedProducts;
    }

    public static resolve() {
        return container.resolve(this);
    }

    private checkSomePromotionForNow(promotionHours: ProductPromotionHours[], nowTimeInMinutes: number): boolean {

        let somePromotionForNow: boolean = false;
        
        promotionHours.map((promoHour) => {
            const startTimeValidation = validateAndFormatTime(promoHour.startTime);
            const endTimeValidation = validateAndFormatTime(promoHour.endTime);
            const {
                startTimeInMinutes,
                endTimeInMinutes,
            } = getTimeIntervalDuration({
                startHour: startTimeValidation.hours,
                startMinutes: startTimeValidation.minutes,
                endHours: endTimeValidation.hours,
                endMinutes: endTimeValidation.minutes,
            });
            if (nowTimeInMinutes >= startTimeInMinutes && nowTimeInMinutes <= endTimeInMinutes) somePromotionForNow = true;
        });

        return somePromotionForNow;
    }
}
