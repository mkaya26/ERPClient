import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { ProductionPipe } from '../../pipes/production.pipe';
import { ProductionModel } from '../../models/production.model';
import { HttpService } from '../../services/http.service';
import { SwallService } from '../../services/swall.service';
import { NgForm } from '@angular/forms';
import { ProductModel } from '../../models/product.model';
import { DepotModel } from '../../models/depot.model';

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [SharedModule, ProductionPipe],
  templateUrl: './production.component.html',
  styleUrl: './production.component.css'
})
export class ProductionComponent {

  search: string = "";
  models: ProductionModel[] = [];
  products: ProductModel[] = [];
  depots: DepotModel[] = [];
  createModel: ProductionModel = new ProductionModel();

  @ViewChild("createModalCloseBtn") createModalClose: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private http: HttpService,
    private swal: SwallService
  ) { }
  ngOnInit(): void {
    this.getList();
    this.getDepotList();
    this.getProductList();
  }

  getList() {
    this.http.post<ProductionModel[]>("Production/GetAll", {}, (res) => {
      this.models = res;
    });
  }

  getDepotList() {
    this.http.post<DepotModel[]>("Depots/GetAll", {}, (res) => {
      this.depots = res;
    });
  }

  getProductList() {
    this.http.post<ProductModel[]>("Products/GetAll", {}, (res) => {
      this.products = res;
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("Production/Create", this.createModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new ProductionModel();
        this.createModalClose?.nativeElement.click();
        this.getList();
      });
    }
  }

  deleteById(model: ProductionModel) {
    this.swal.callSwal("Üretimi Sil?", `${model.product.name} üretimini silmek istiyormusunuz?`, () => {
      this.http.post<string>("Depots/DeleteById", { id: model.id }, (res) => {
        this.getList();
        this.swal.callToast(res, "info");
      })
    })
  }
}
