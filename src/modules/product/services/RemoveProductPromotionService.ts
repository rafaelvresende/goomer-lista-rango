import { injectable, container, inject } from "tsyringe";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest {
    productId: number;
}

@injectable()
export default class RemoveProductPromotionService {

    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository,
    ) { }

    public async execute({
        productId,
    }: IRequest): Promise<void> {

        const product = await this.productRepository.getProductById(productId);

        product.promotionDescription = null;
        product.promotionValue = null;
        
        await this.productRepository.updateProduct(product);

        const promotionHours = await this.productRepository.listPromotionHoursByProduct(productId);

        await Promise.all(promotionHours.map(async (promoHours) => {
            await this.productRepository.removePromotionHours(promoHours.id);
        }));
    }

    public static resolve() {
        return container.resolve(this);
    }
}
