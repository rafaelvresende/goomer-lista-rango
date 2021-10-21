import { DaysOfTheWeekDescriptions } from "@shared/interfaces/IDayOfTheWeek";
import validateAndFormatTime from "@shared/utils/validateAndFormatTime";
import { injectable, container, inject } from "tsyringe";
import Product from "../entities/Product";
import ProductPromotionHours from "../entities/ProductPromotionHours";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest {
    productId: number;
}

interface IParsedProductPromotionHours extends ProductPromotionHours {
    dayName: string;
}

interface IProductWithPromotionHours extends Product {
    promotionHours: IParsedProductPromotionHours[];
}

@injectable()
export default class GetProductByIdService {

    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository,
    ) { }

    public async execute({
        productId,
    }: IRequest): Promise<IProductWithPromotionHours> {
        
        const product = await this.productRepository.getProductById(productId);

        const promotionHours = await this.productRepository.listPromotionHoursByProduct(productId);

        const parsedPromotionHours = promotionHours.map((promoHours) => {
            const parsedPromoHours: IParsedProductPromotionHours = {
                ...promoHours,
                dayName: DaysOfTheWeekDescriptions[promoHours.day],
            };
            parsedPromoHours.startTime = validateAndFormatTime(promoHours.startTime).time;
            parsedPromoHours.endTime = validateAndFormatTime(promoHours.endTime).time;
            return parsedPromoHours;
        });

        const productWithPromotionHours: IProductWithPromotionHours = {
            ...product,
            promotionHours: parsedPromotionHours,
        }

        return productWithPromotionHours;
    }

    public static resolve() {
        return container.resolve(this);
    }
}
