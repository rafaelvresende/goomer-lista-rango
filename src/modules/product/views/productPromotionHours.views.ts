import ProductPromotionHours from "../entities/ProductPromotionHours";

export function formatToEntity(productPromotionHoursObject: any): ProductPromotionHours {

    return {
        id: productPromotionHoursObject.id,
        day: productPromotionHoursObject.day,
        startTime: productPromotionHoursObject.start_time,
        endTime: productPromotionHoursObject.end_time,
        productId: productPromotionHoursObject.product_id,
    };
}

export function formatAllToEntities(productPromotionHoursObjects: any[]): ProductPromotionHours[] {

    return productPromotionHoursObjects.map((productPromotionHoursObject) => formatToEntity(productPromotionHoursObject));
}
