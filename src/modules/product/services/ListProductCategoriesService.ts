import { injectable, container } from "tsyringe";
import { IProductCategory, ProductCategoryDescriptions, ValidProductCategoryList } from "../entities/Product";

interface IProductCategoryObject {
    name: string;
    value: IProductCategory;
}

@injectable()
export default class ListProductCategoriesService {

    constructor() { }

    public async execute(): Promise<IProductCategoryObject[]> {

        const productCategoriesObjects = ValidProductCategoryList.map((categoryValue) => {

            const productCategoryObject: IProductCategoryObject = {
                name: ProductCategoryDescriptions[categoryValue],
                value: categoryValue,
            };

            return productCategoryObject;
        });

        return productCategoriesObjects;
    }

    public static resolve() {
        return container.resolve(this);
    }
}
