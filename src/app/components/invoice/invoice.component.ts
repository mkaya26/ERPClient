import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { InvoicePipe } from '../../pipes/invoice.pipe';
import { InvoiceModel } from '../../models/invoice.model';
import { CustomerModel } from '../../models/customer.model';
import { ProductModel } from '../../models/product.model';
import { InvoiceDetailModel } from '../../models/invoice-detail.model';
import { HttpService } from '../../services/http.service';
import { SwallService } from '../../services/swall.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { DepotModel } from '../../models/depot.model';
import { ActivatedRoute } from '@angular/router';
import { OrderModel, OrderStatusEnum } from '../../models/order.model';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [SharedModule, InvoicePipe],
  providers: [DatePipe],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {

  search: string = "";
  models: InvoiceModel[] = [];
  customers: CustomerModel[] = [];
  products: ProductModel[] = [];
  depots: DepotModel[] = [];
  detail: InvoiceDetailModel = new InvoiceDetailModel();
  updateDetail: InvoiceDetailModel = new InvoiceDetailModel();
  createModel: InvoiceModel = new InvoiceModel();
  updateModel: InvoiceModel = new InvoiceModel();
  type: number = 1;
  pageName: string = "Alış Faturaları";

  orders: OrderModel[] = [];
  customerOrders: OrderModel[] = [];

  @ViewChild("createModalCloseBtn") createModalClose: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalClose: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private http: HttpService,
    private swal: SwallService,
    private date: DatePipe,
    private activated: ActivatedRoute
  ) {
    this.activated.params.subscribe(res => {
      this.type = +res["type"];
      if (this.type === 1) {
        this.pageName = "Alış Faturaları";
      } else {
        this.pageName = "Satış Faturaları";
      }
      this.createModel.invoiceDate = this.date.transform(new Date(), "yyyy-MM-dd") ?? "";
      this.createModel.invoiceTypeValue = this.type;
      this.getList();
      this.getProductList();
      this.getCustomerList();
      this.getDepotList();
      this.getOrderList();
    });

  }

  getList() {
    this.http.post<InvoiceModel[]>("Invoice/GetAll", { type: this.type }, (res) => {
      this.models = res;
    });
  }

  getOrderList() {
    this.http.post<OrderModel[]>("Order/GetAll", {}, (res) => {
      this.orders = res.filter(f => f.status.value < 3);
    });
  }

  getProductList() {
    this.http.post<ProductModel[]>("Products/GetAll", {}, (res) => {
      this.products = res;
    });
  }

  getCustomerList() {
    this.http.post<CustomerModel[]>("Customers/GetAll", {}, (res) => {
      this.customers = res;
    });
  }

  getDepotList() {
    this.http.post<DepotModel[]>("Depots/GetAll", {}, (res) => {
      this.depots = res;
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("Invoice/Create", this.createModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new InvoiceModel();
        this.createModel.invoiceDate = this.date.transform(new Date(), "yyyy-MM-dd") ?? "";
        this.createModel.invoiceTypeValue = this.type;
        this.createModalClose?.nativeElement.click();
        this.getList();
      });
    }
  }

  deleteById(model: InvoiceModel) {
    this.swal.callSwal("Fatura Sil?", `${model.invoiceNumberFull} nolu faturayı silmek istiyormusunuz?`, () => {
      this.http.post<string>("Invoice/DeleteById", { id: model.id }, (res) => {
        this.getList();
        this.swal.callToast(res, "info");
      })
    })
  }

  get(model: InvoiceModel) {
    this.updateModel = { ...model };
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("Invoice/Update", this.updateModel, (res) => {
        this.swal.callToast(res, "info");
        this.updateModalClose?.nativeElement.click();
        this.getList();
      });
    }
  }

  addDetail() {
    const product = this.products.find(p => p.id == this.detail.productId);
    //
    if (product) {
      this.detail.product = product;
    }
    //
    const depot = this.depots.find(p => p.id == this.detail.depotId);
    //
    if (depot) {
      this.detail.depot = depot;
    }
    //
    this.createModel.invoiceDetails.push(this.detail);
    this.detail = new InvoiceDetailModel();
  }

  addUpdateDetail() {
    const product = this.products.find(p => p.id == this.updateDetail.productId);
    //
    if (product) {
      this.updateDetail.product = product;
    }
    //
    const depot = this.depots.find(p => p.id == this.detail.depotId);
    //
    if (depot) {
      this.updateDetail.depot = depot;
    }
    //
    this.updateModel.invoiceDetails.push(this.updateDetail);
    this.updateDetail = new InvoiceDetailModel();
  }

  removeDetail(index: number) {
    this.createModel.invoiceDetails.splice(index, 1);
  }

  updateDetailRemove(index: number) {
    this.updateModel.invoiceDetails.splice(index, 1);
  }

  setCustomerOrders(form:number){
    if(form==1){
      this.customerOrders = this.orders.filter(f => f.customerId == this.createModel.customerId);
    }else{
      this.customerOrders = this.orders.filter(f => f.customerId == this.updateModel.customerId);
    }
  }
}
