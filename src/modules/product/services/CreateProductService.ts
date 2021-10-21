import { injectable, container, inject } from "tsyringe";
import { IProductCategory, ValidProductCategoryList } from "../entities/Product";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest {
    name: string;
    value: number;
    category: IProductCategory;
    restaurantId: number;
}

@injectable()
export default class CreateProductService {

    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository,
    ) { }

    public async execute({
        name,
        value,
        category,
        restaurantId,
    }: IRequest): Promise<number> {

        if (!ValidProductCategoryList.includes(category)) throw new Error("Categoria de produto inválida!");
        
        const productId = await this.productRepository.createProduct({
            name,
            value,
            category,
            restaurantId,
        });

        return productId;
    }

    public static resolve() {
        return container.resolve(this);
    }
}
