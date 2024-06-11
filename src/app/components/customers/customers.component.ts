import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { CustomerModel } from '../../models/customer.model';
import { HttpService } from '../../services/http.service';
import { CustomerPipe } from '../../pipes/customer.pipe';
import { NgForm } from '@angular/forms';
import { SwallService } from '../../services/swall.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [SharedModule, CustomerPipe],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {

  search: string = "";
  models: CustomerModel[] = [];
  createModel: CustomerModel = new CustomerModel();
  updateModel: CustomerModel = new CustomerModel();

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
    this.http.post<CustomerModel[]>("Customers/GetAll", {}, (res) => {
      this.models = res;
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("Customers/Create", this.createModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new CustomerModel();
        this.createModalClose?.nativeElement.click();
        this.getList();
      });
    }
  }

  deleteById(model: CustomerModel) {
    this.swal.callSwal("Müşteri Sil?", `${model.name} müşterisini silmek istiyormusunuz?`, () => {
      this.http.post<string>("Customers/DeleteById", { id: model.id }, (res) => {
        this.getList();
        this.swal.callToast(res, "info");
      })
    })
  }

  get(model: CustomerModel) {
    this.updateModel = { ...model };
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("Customers/Update", this.updateModel, (res) => {
        this.swal.callToast(res,"info");
        this.updateModalClose?.nativeElement.click();
        this.getList();
      });
    }
  }
}
