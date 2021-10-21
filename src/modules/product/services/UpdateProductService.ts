import { injectable, container, inject } from "tsyringe";
import { IProductCategory } from "../entities/Product";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest {
    id: number;
    name: string;
    value: number;
    category: IProductCategory;
}

@injectable()
export default class UpdateProductService {

    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository,
    ) { }

    public async execute({
        id,
        name,
        value,
        category,
    }: IRequest): Promise<void> {
        
        const product = await this.productRepository.getProductById(id);

        if (name) product.name = name;
        if (value) product.value = value;
        if (category) product.category = category;

        await this.productRepository.updateProduct(product);
    }

    public static resolve() {
        return container.resolve(this);
    }
}
