import { CustomerModel } from "./customer.model";
import { OrderDetailModel } from "./order-detail.model"

export class OrderModel{
    id: string = "";
    orderNumber: number = 0;
    orderNumberYear: number = 0;
    orderNumberFull: string = "";
    customerId: string = "";
    customer: CustomerModel = new CustomerModel();
    orderDate: string = "";
    deliveryDate: string = "";
    orderDetails: OrderDetailModel[] = [];
}