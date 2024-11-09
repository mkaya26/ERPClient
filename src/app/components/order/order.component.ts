import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { OrderPipe } from '../../pipes/order.pipe';
import { OrderModel } from '../../models/order.model';
import { HttpService } from '../../services/http.service';
import { SwallService } from '../../services/swall.service';
import { NgForm } from '@angular/forms';
import { CustomerModel } from '../../models/customer.model';
import { ProductModel } from '../../models/product.model';
import { OrderDetailModel } from '../../models/order-detail.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [SharedModule, OrderPipe],
  providers: [DatePipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  search: string = "";
  models: OrderModel[] = [];
  customers: CustomerModel[] = [];
  products: ProductModel[] = [];
  detail: OrderDetailModel = new OrderDetailModel();
  updateDetail: OrderDetailModel = new OrderDetailModel();
  createModel: OrderModel = new OrderModel();
  updateModel: OrderModel = new OrderModel();

  @ViewChild("createModalCloseBtn") createModalClose: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalClose: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private http: HttpService,
    private swal: SwallService,
    private date: DatePipe
  ) { 
    this.createModel.orderDate = this.date.transform(new Date(), "yyyy-MM-dd") ?? "";
    this.createModel.deliveryDate = this.date.transform(new Date(), "yyyy-MM-dd") ?? "";
  }
  ngOnInit(): void {
    this.getList();
    this.getProductList();
    this.getCustomerList();
  }

  getList() {
    this.http.post<OrderModel[]>("Order/GetAll", {}, (res) => {
      this.models = res;
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

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("Order/Create", this.createModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new OrderModel();
        this.createModel.orderDate = this.date.transform(new Date(), "yyyy-MM-dd") ?? "";
        this.createModel.deliveryDate = this.date.transform(new Date(), "yyyy-MM-dd") ?? "";
        this.createModalClose?.nativeElement.click();
        this.getList();
      });
    }
  }

  deleteById(model: OrderModel) {
    this.swal.callSwal("Sipariş Sil?", `${model.orderNumberFull} nolu siparişi silmek istiyormusunuz?`, () => {
      this.http.post<string>("Order/DeleteById", { id: model.id }, (res) => {
        this.getList();
        this.swal.callToast(res, "info");
      })
    })
  }

  get(model: OrderModel) {
    this.updateModel = { ...model };
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("Order/Update", this.updateModel, (res) => {
        this.swal.callToast(res,"info");
        this.updateModalClose?.nativeElement.click();
        this.getList();
      });
    }
  }

  addDetail(){
    const product = this.products.find(p => p.id == this.detail.productId);
    //
    if(product){
      this.detail.product = product;
    }
    //
    this.createModel.orderDetails.push(this.detail);
    this.detail = new OrderDetailModel();
  }

  addUpdateDetail(){
    const product = this.products.find(p => p.id == this.updateDetail.productId);
    //
    if(product){
      this.updateDetail.product = product;
    }
    //
    this.updateModel.orderDetails.push(this.updateDetail);
    this.updateDetail = new OrderDetailModel();
  }

  removeDetail(index:number){
    this.createModel.orderDetails.splice(index,1);
  }

  updateDetailRemove(index:number){
    this.updateModel.orderDetails.splice(index,1);
  }
}
