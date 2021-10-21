import db from "@shared/utils/databaseConnection";

import Product from "@modules/product/entities/Product";
import ProductPromotionHours from "@modules/product/entities/ProductPromotionHours";

import IProductRepository from "../IProductRepository";
import { IAddPromotionHoursDTO, ICreateProductDTO, IListProductsByRestaurant } from "../dtos/IProductRepositoryDTOs";

import * as ProductViews from "../../views/product.views";
import * as ProductPromotionHoursViews from "../../views/productPromotionHours.views";

import { ResultSetHeader } from "mysql2";

export default class ProductRepository implements IProductRepository {

    public async listProductsByRestaurant({
        restaurantId,
    }: IListProductsByRestaurant): Promise<Product[]> {

        try {

            const products: any[] = [];

            const [rows, fields] = await db.execute(`SELECT * FROM product WHERE restaurant_id = ${restaurantId};`);
            if (Array.isArray(rows)) products.push(...rows);

            return ProductViews.formatAllToEntities(products);

        } catch(error) {
            console.log(error);
            throw new Error("Falha ao buscar produtos!");
        }
    }

    public async createProduct({
        name,
        value,
        category,
        restaurantId,
    }: ICreateProductDTO): Promise<number> {

        try {

            const [ resultSetHeader ] = await db.execute(`
                INSERT INTO product
                (name, value, category, restaurant_id)
                VALUES ('${name}', ${value}, '${category}', '${restaurantId}');
            `);

            const id = ((resultSetHeader as ResultSetHeader).insertId);

            return id;

        } catch(error) {
            console.log(error);
            throw new Error("Falha ao criar produto!");
        }
    }

    public async getProductById(id: number): Promise<Product> {

        try {

            const [rows, fields] = await db.execute(`SELECT * FROM product WHERE id = ${id};`);

            if (!(Array.isArray(rows) && rows.length > 0)) throw new Error("Produto não encontrado!");

            return ProductViews.formatToEntity(rows[0]);

        } catch(error) {
            console.log(error);
            throw new Error("Produto não encontrado!");
        }        
    }

    public async updateProduct({
        id,
        name,
        value,
        category,
        promotionDescription,
        promotionValue,
    }: Product): Promise<void> {

        try {

            await db.execute(`
                UPDATE product
                SET name = '${name}', value = ${value}, category = '${category}', promotion_description = '${promotionDescription}', promotion_value = ${promotionValue}
                WHERE id = ${id};
            `);

        } catch(error) {
            console.log(error);
            throw new Error("Falha ao atualizar os dados do produto!");
        }
    }

    public async deleteProduct(id: number): Promise<void> {

        try {

            await db.execute(`DELETE FROM product WHERE id = ${id};`);

        } catch(error) {
            console.log(error);
            throw new Error("Falha ao excluir produto!");
        }
    }

    public async addPromotionHours({
        day,
        startTime,
        endTime,
        productId,
    }: IAddPromotionHoursDTO): Promise<void> {

        try {

            await db.execute(`
                INSERT INTO promotion_hours
                (day, start_time, end_time, product_id)
                VALUES ('${day}', '${startTime}', '${endTime}', ${productId});
            `);

        } catch(error) {
            console.log(error);
            throw new Error("Falha ao adicionar horário da promoção!");
        }
    }

    public async removePromotionHours(id: number): Promise<void> {

        try {

            await db.execute(`DELETE FROM promotion_hours WHERE id = ${id};`);

        } catch(error) {
            console.log(error);
            throw new Error("Falha ao remover horário da promoção!");
        }
    }

    public async listPromotionHoursByProduct(productId: number): Promise<ProductPromotionHours[]> {

        try {

            const promotionHours: any[] = [];

            const [rows, fields] = await db.execute(`SELECT * FROM promotion_hours WHERE product_id = ${productId};`);
            if (Array.isArray(rows)) promotionHours.push(...rows);

            return ProductPromotionHoursViews.formatAllToEntities(promotionHours);

        } catch(error) {
            console.log(error);
            throw new Error("Falha ao buscar horários da promoção!");
        }
    }

    public async listPromotionHoursByMultipleProducts(productsIds: number[]): Promise<ProductPromotionHours[]> {

        try {

            const promotionHours: any[] = [];

            const [rows, fields] = await db.execute(`SELECT * FROM promotion_hours WHERE product_id IN (${productsIds.join(", ")});`);
            if (Array.isArray(rows)) promotionHours.push(...rows);

            return ProductPromotionHoursViews.formatAllToEntities(promotionHours);

        } catch(error) {
            console.log(error);
            throw new Error("Falha ao buscar horários da promoção!");
        }
    }
}
