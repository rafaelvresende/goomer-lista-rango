import Product from "../entities/Product";
import ProductPromotionHours from "../entities/ProductPromotionHours";
import { IAddPromotionHoursDTO, ICreateProductDTO, IListProductsByRestaurant } from "./dtos/IProductRepositoryDTOs";

export default interface IProductRepository {

    listProductsByRestaurant({
        restaurantId,
    }: IListProductsByRestaurant): Promise<Product[]>;

    createProduct({
        name,
        value,
        category,
        restaurantId,
    }: ICreateProductDTO): Promise<number>;

    getProductById(id: number): Promise<Product>;

    updateProduct({
        id,
        name,
        value,
        category,
        promotionDescription,
        promotionValue,
    }: Product): Promise<void>;

    deleteProduct(id: number): Promise<void>;

    addPromotionHours({
        day,
        startTime,
        endTime,
        productId,
    }: IAddPromotionHoursDTO): Promise<void>;

    removePromotionHours(id: number): Promise<void>;

    listPromotionHoursByProduct(productId: number): Promise<ProductPromotionHours[]>;

    listPromotionHoursByMultipleProducts(productsIds: number[]): Promise<ProductPromotionHours[]>;
}
