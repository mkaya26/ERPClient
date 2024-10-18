import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SwallService } from '../../services/swall.service';
import { RecipeModel } from '../../models/recipe.model';
import { NgForm } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';
import { RecipePipe } from '../../pipes/recipe.pipe';
import { ProductModel } from '../../models/product.model';
import { RecipeDetailModel } from '../../models/recipe-detail.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [SharedModule, RecipePipe,RouterLink],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  search: string = "";
  models: RecipeModel[] = [];
  createModel: RecipeModel = new RecipeModel();
  products: ProductModel[] = [];
  detail: RecipeDetailModel = new RecipeDetailModel();

  @ViewChild("createModalCloseBtn") createModalClose: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalClose: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private http: HttpService,
    private swal: SwallService
  ) { }
  ngOnInit(): void {
    this.getList();
    this.getAllProducts();
  }

  getList() {
    this.http.post<RecipeModel[]>("Recipes/GetAll", {}, (res) => {
      this.models = res;
    });
  }

  getAllProducts(){
    this.http.post<ProductModel[]>("Products/GetAll", {}, (res) => {
      this.products = res;
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("Recipes/Create", this.createModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new RecipeModel();
        this.createModalClose?.nativeElement.click();
        this.getList();
      });
    }
  }

  deleteById(model: RecipeModel) {
    this.swal.callSwal("Reçete Sil?", `${model.product.name} ürününe ait reçeteyi silmek istiyormusunuz?`, () => {
      this.http.post<string>("Recipes/DeleteById", { id: model.id }, (res) => {
        this.getList();
        this.swal.callToast(res, "info");
      })
    })
  }

  addDetail(){
    const product = this.products.find(p => p.id == this.detail.productId);
    if(product){
      this.detail.product = product;
    }
    this.createModel.recipeDetails.push(this.detail);
    this.detail = new RecipeDetailModel();
  }

  removeDetail(index:number){
    this.createModel.recipeDetails.splice(index,1);
  }

  gotoDetail(model:RecipeModel){

  }
}
