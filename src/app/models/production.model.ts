import { DepotModel } from "./depot.model";
import { ProductModel } from "./product.model";

export class ProductionModel {
    id: string = "";
    productionDate: string = "";
    productId: string = "";
    product: ProductModel = new ProductModel();
    depotId: string = "";
    depot: DepotModel = new DepotModel();
    quantity: number = 0;
}