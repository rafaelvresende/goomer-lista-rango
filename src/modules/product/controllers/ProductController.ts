import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import GetProductByIdService from "../services/GetProductByIdService";
import ListProductCategoriesService from "../services/ListProductCategoriesService";
import ListProductsByRestaurantService from "../services/ListProductsByRestaurantService";
import RemoveProductPromotionService from "../services/RemoveProductPromotionService";
import UpdateProductPromotionService from "../services/UpdateProductPromotionService";
import UpdateProductService from "../services/UpdateProductService";
import ValidatePromotionHoursService from "../services/ValidatePromotionHoursService";

export default class ProductController {

    public async listProductsByRestaurant(request: Request, response: Response) {

        try {

            const { restaurantId } = request.body;
            if (!restaurantId) throw new Error("Escolha de qual restaurante deseja listar os produtos!");

            const listProductsByRestaurant = ListProductsByRestaurantService.resolve();
            const products = await listProductsByRestaurant.execute({ restaurantId });

            response.status(200).json({ products });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    public async listProductCategories(request: Request, response: Response) {

        try {

            const listProductCategories = ListProductCategoriesService.resolve();
            const productCategoriesList = await listProductCategories.execute();

            response.status(200).json({ productCategoriesList });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    public async getProduct(request: Request, response: Response) {

        try {

            const { productId } = request.body;
            if (!productId) throw new Error("Escolha qual produto deseja visualizar!");

            const getProductById = GetProductByIdService.resolve();
            const product = await getProductById.execute({ productId });

            response.status(200).json({ product });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    public async createProduct(request: Request, response: Response) {

        try {

            const {
                name,
                value,
                category,
                restaurantId,
            } = request.body;

            if (!name) throw new Error("Por favor, informe o nome do produto!");
            if (!value) throw new Error("Por favor, informe o valor do produto!");
            if (!category) throw new Error("Por favor, informe a categoria do produto!");
            if (!restaurantId) throw new Error("Por favor, informe a qual restaurante pertence o produto!");

            const createProduct = CreateProductService.resolve();
            const productId = await createProduct.execute({
                name,
                value,
                category,
                restaurantId,
            });

            const getProductById = GetProductByIdService.resolve();
            const product = await getProductById.execute({ productId });

            response.status(200).json({ product });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    public async updateProduct(request: Request, response: Response) {

        try {

            const {
                id,
                name,
                value,
                category,
            } = request.body;

            if (!id) throw new Error("Por favor, informe qual produto deseja editar!");

            const updateProduct = UpdateProductService.resolve();
            await updateProduct.execute({
                id,
                name,
                value,
                category,
            });

            const getProductById = GetProductByIdService.resolve();
            const product = await getProductById.execute({ productId: id });

            response.status(200).json({ product });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    public async deleteProduct(request: Request, response: Response) {

        try {

            const { productId } = request.body;
            if (!productId) throw new Error("Escolha qual produto deseja excluir!");

            const deleteProduct = DeleteProductService.resolve();
            await deleteProduct.execute({ productId });

            response.status(200).json({ message: "Produto excluído com sucesso!" });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    public async updatePromotion(request: Request, response: Response) {

        try {

            const {
                productId,
                promotionDescription,
                promotionValue,
                promotionHours,
            } = request.body;

            if (!productId) throw new Error("Informe o produto que deseja colocar em promoção!");
            if (!promotionDescription) throw new Error("Informe a descrição da promoção!");
            if (!promotionValue) throw new Error("Informe o valor promocional do produto!");
            if (!promotionHours) throw new Error("Informe os horários que o produto entrará em promoção!");

            const validatePromotionHours = ValidatePromotionHoursService.resolve();
            validatePromotionHours.execute({ promotionHours });

            const updateProductPromotion = UpdateProductPromotionService.resolve();
            await updateProductPromotion.execute({
                productId,
                promotionDescription,
                promotionValue,
                promotionHours,
            });

            response.status(200).json({ message: "Promoção atualizada com sucesso!" });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    public async removePromotion(request: Request, response: Response) {

        try {

            const { productId } = request.body;
            if (!productId) throw new Error("Escolha de qual produto deseja remover a promoção!");

            const removeProductPromotion = RemoveProductPromotionService.resolve();
            await removeProductPromotion.execute({ productId });

            response.status(200).json({ message: "Promoção removida com sucesso!" });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }
}
