import { Router } from "express";

import ProductController from "@modules/product/controllers/ProductController";
const productController = new ProductController();

const productRouter = Router();

productRouter.get(
    "/",
    productController.listProductsByRestaurant,
);

productRouter.get(
    "/categories",
    productController.listProductCategories,
);

productRouter.get(
    "/product",
    productController.getProduct,
);

productRouter.post(
    "/product",
    productController.createProduct,
);

productRouter.put(
    "/product",
    productController.updateProduct,
);

productRouter.delete(
    "/product",
    productController.deleteProduct,
);

productRouter.put(
    "/product/promotion",
    productController.updatePromotion,
);

productRouter.delete(
    "/product/promotion",
    productController.removePromotion,
);

export { productRouter };
