import { injectable, container, inject } from "tsyringe";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest {
    productId: number;
}

@injectable()
export default class DeleteProductService {

    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository,
    ) { }

    public async execute({
        productId,
    }: IRequest): Promise<void> {
        
        await this.productRepository.deleteProduct(productId);
    }

    public static resolve() {
        return container.resolve(this);
    }
}
