import Restaurant from "../entities/Restaurant";

export function formatToEntity(restaurantObject: any): Restaurant {

    return {
        id: restaurantObject.id,
        name: restaurantObject.name,
        street: restaurantObject.street,
        number: restaurantObject.number,
        neighborhood: restaurantObject.neighborhood,
        city: restaurantObject.city,
        state: restaurantObject.state,
    };
}

export function formatAllToEntities(restaurantObjects: any[]): Restaurant[] {

    return restaurantObjects.map((restaurantObject) => formatToEntity(restaurantObject));
}
