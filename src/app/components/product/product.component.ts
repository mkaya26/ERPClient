import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { ProductPipe } from '../../pipes/product.pipe';
import { ProductModel, productTypes } from '../../models/product.model';
import { SwallService } from '../../services/swall.service';
import { HttpService } from '../../services/http.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule,ProductPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  search: string = "";
  models: ProductModel[] = [];
  createModel: ProductModel = new ProductModel();
  updateModel: ProductModel = new ProductModel();
  types = productTypes;

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
    this.http.post<ProductModel[]>("Products/GetAll", {}, (res) => {
      this.models = res;
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("Products/Create", this.createModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new ProductModel();
        this.createModalClose?.nativeElement.click();
        this.getList();
      });
    }
  }

  deleteById(model: ProductModel) {
    this.swal.callSwal("Ürün Sil?", `${model.name} ürününü silmek istiyormusunuz?`, () => {
      this.http.post<string>("Products/DeleteById", { id: model.id }, (res) => {
        this.getList();
        this.swal.callToast(res, "info");
      })
    })
  }

  get(model: ProductModel) {
    console.log(model);
    this.updateModel = { ...model };
    this.updateModel.typeValue = model.type.value;
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("Products/Update", this.updateModel, (res) => {
        this.swal.callToast(res,"info");
        this.updateModalClose?.nativeElement.click();
        this.getList();
      });
    }
  }
}
