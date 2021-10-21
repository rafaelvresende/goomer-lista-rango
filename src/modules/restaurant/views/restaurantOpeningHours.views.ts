import RestaurantOpeningHours from "../entities/RestaurantOpeningHours";

export function formatToEntity(restaurantOpeningHoursObject: any): RestaurantOpeningHours {

    return {
        id: restaurantOpeningHoursObject.id,
        day: restaurantOpeningHoursObject.day,
        startTime: restaurantOpeningHoursObject.start_time,
        endTime: restaurantOpeningHoursObject.end_time,
        restaurantId: restaurantOpeningHoursObject.restaurant_id,
    };
}

export function formatAllToEntities(restaurantOpeningHoursObjects: any[]): RestaurantOpeningHours[] {

    return restaurantOpeningHoursObjects.map((restaurantOpeningHoursObject) => formatToEntity(restaurantOpeningHoursObject));
}
