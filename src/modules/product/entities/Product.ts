export default class Product {
    id: number;
    name: string;
    value: number;
    category: IProductCategory;
    promotionDescription?: string | null;
    promotionValue?: number | null;
    restaurantId: number;
}

export type IProductCategory =
    "candy" |
    "salty" |
    "lunch" |
    "fastFood" |
    "drink";

export type IDescriptionsByProductCategory = {
    [productCategory in IProductCategory]: string;
}

export const ProductCategoryDescriptions: IDescriptionsByProductCategory = {
    candy: "Doces",
    salty: "Salgados",
    lunch: "Refeições",
    fastFood: "Fast-food",
    drink: "Bebidas",
};

export const ValidProductCategoryList = Object.keys(ProductCategoryDescriptions) as IProductCategory[];
