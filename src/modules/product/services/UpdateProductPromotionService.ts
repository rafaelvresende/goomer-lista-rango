import IDayOfTheWeek from "@shared/interfaces/IDayOfTheWeek";
import { injectable, container, inject } from "tsyringe";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest {
    productId: number;
    promotionDescription: string;
    promotionValue: number;
    promotionHours: IPromotionHoursToUpdate[];
}

interface IPromotionHoursToUpdate {
    id?: number;
    day: IDayOfTheWeek;
    startTime: string;
    endTime: string;
}

@injectable()
export default class UpdateProductPromotionService {

    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository,
    ) { }

    public async execute({
        productId,
        promotionDescription,
        promotionValue,
        promotionHours,
    }: IRequest): Promise<void> {

        const product = await this.productRepository.getProductById(productId);

        product.promotionDescription = promotionDescription;
        product.promotionValue = promotionValue;

        await this.productRepository.updateProduct(product);

        const previousPromotionHours = await this.productRepository.listPromotionHoursByProduct(productId);

        await Promise.all(previousPromotionHours.map(async (previousPromotionHour) => {
            const wasThisPromotionHourMaintained = promotionHours.find((promoHour) => promoHour.id === previousPromotionHour.id);
            if (!wasThisPromotionHourMaintained) {
                await this.productRepository.removePromotionHours(previousPromotionHour.id);
            }
        }));

        await Promise.all(promotionHours.map(async (promotionHour) => {
            const hasThisPromotionHourAlreadyBeenAdded = promotionHour.id && previousPromotionHours.find((promoHour) => promoHour.id === promotionHour.id);
            if (!hasThisPromotionHourAlreadyBeenAdded) {
                await this.productRepository.addPromotionHours({
                    day: promotionHour.day,
                    startTime: promotionHour.startTime,
                    endTime: promotionHour.endTime,
                    productId,
                });
            }
        }));
    }

    public static resolve() {
        return container.resolve(this);
    }
}
