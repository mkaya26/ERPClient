import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { OrderPipe } from '../../pipes/order.pipe';
import { OrderModel } from '../../models/order.model';
import { HttpService } from '../../services/http.service';
import { SwallService } from '../../services/swall.service';
import { NgForm } from '@angular/forms';
import { CustomerModel } from '../../models/customer.model';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [SharedModule, OrderPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  search: string = "";
  models: OrderModel[] = [];
  customers: CustomerModel[] = [];
  products: ProductModel[] = [];
  createModel: OrderModel = new OrderModel();
  updateModel: OrderModel = new OrderModel();

  @ViewChild("createModalCloseBtn") createModalClose: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalClose: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private http: HttpService,
    private swal: SwallService
  ) { }
  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.http.post<OrderModel[]>("Order/GetAll", {}, (res) => {
      this.models = res;
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
}
