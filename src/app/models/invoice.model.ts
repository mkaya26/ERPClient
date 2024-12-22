import { CustomerModel } from "./customer.model";
import { InvoiceDetailModel } from "./invoice-detail.model";

export class InvoiceModel {
    id: string = "";
    invoiceNumberFull: string = "";
    customerId: string = "";
    customer: CustomerModel = new CustomerModel();
    invoiceDate: string = "";
    invoiceType: InvoiceTypeEnum = new InvoiceTypeEnum();
    invoiceTypeValue: number = 1;
    invoiceDetails: InvoiceDetailModel[] = [];
    orderId: string = "";
}

export class InvoiceTypeEnum {
    value: number = 1;
    name: string = "";
}