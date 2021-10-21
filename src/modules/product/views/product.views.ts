import Product from "../entities/Product";

export function formatToEntity(productObject: any): Product {

    return {
        id: productObject.id,
        name: productObject.name,
        value: productObject.value,
        category: productObject.category,
        promotionDescription: productObject.promotion_description,
        promotionValue: productObject.promotion_value,
        restaurantId: productObject.restaurant_id,
    };
}

export function formatAllToEntities(productObjects: any[]): Product[] {

    return productObjects.map((productObject) => formatToEntity(productObject));
}
