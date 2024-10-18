import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { RecipeDetailsPipe } from '../../pipes/recipe-details.pipe';
import { RecipeDetailModel } from '../../models/recipe-detail.model';
import { HttpService } from '../../services/http.service';
import { SwallService } from '../../services/swall.service';
import { NgForm } from '@angular/forms';
import { ProductModel } from '../../models/product.model';
import { RecipeModel } from '../../models/recipe.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [SharedModule, RecipeDetailsPipe],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {

  recipesRoutingHtml: string = "<a href='/recipes'>Reçeteler</a>";
  search: string = "";
  model: RecipeModel = new RecipeModel();
  createModel: RecipeDetailModel = new RecipeDetailModel();
  updateModel: RecipeDetailModel = new RecipeDetailModel();
  products: ProductModel[] = [];
  recipeId: string = "";

  isUpdateFormActive:boolean = false;

  constructor(
    private http: HttpService,
    private swal: SwallService,
    private activated: ActivatedRoute
  ) {
    this.activated.params.subscribe(res => {
      this.recipeId = res["id"];
      if (this.recipeId) {
        this.getList();
      }
    });
  }
  ngOnInit(): void {
    this.getProductList();
  }

  getList() {
    this.http.post<RecipeModel>("Recipes/GetByIdRecipeWithDetails", { id: this.recipeId }, (res) => {
      this.model = res;
    });
  }

  getProductList() {
    this.http.post<ProductModel[]>("Products/GetAll", {}, (res) => {
      this.products = res;
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.createModel.recipeId = this.recipeId;
      this.http.post<string>("RecipeDetails/Create", this.createModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new RecipeDetailModel();
        this.getList();
      });
    }
  }

  deleteById(model: RecipeDetailModel) {
    this.swal.callSwal("Reçetedeki Ürünü Sil?", `${model.product.name} ürününü silmek istiyormusunuz?`, () => {
      this.http.post<string>("RecipeDetails/DeleteById", { id: model.id }, (res) => {
        this.getList();
        this.swal.callToast(res, "info");
      })
    })
  }

  get(model: RecipeDetailModel) {
    console.log(model);
    this.updateModel = { ...model };
    this.updateModel.product = this.products.find(p => p.id == this.updateModel.productId) ?? new ProductModel();
    this.isUpdateFormActive = true;
  }

  update(form: NgForm) {
    if (form.valid) {
      this.updateModel.recipeId = this.recipeId;
      this.http.post<string>("RecipeDetails/Update", this.updateModel, (res) => {
        this.swal.callToast(res, "info");
        this.getList();
        this.isUpdateFormActive = false;
      });
    }
  }

  setIsUpdateFormActive(){
    this.isUpdateFormActive = false;
  }
}
