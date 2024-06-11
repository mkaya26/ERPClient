import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { DepotPipe } from '../../pipes/depot.pipe';
import { DepotModel } from '../../models/depot.model';
import { HttpService } from '../../services/http.service';
import { SwallService } from '../../services/swall.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-depot',
  standalone: true,
  imports: [SharedModule,DepotPipe],
  templateUrl: './depot.component.html',
  styleUrl: './depot.component.css'
})
export class DepotComponent implements OnInit {

  search: string = "";
  models: DepotModel[] = [];
  createModel: DepotModel = new DepotModel();
  updateModel: DepotModel = new DepotModel();

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
    this.http.post<DepotModel[]>("Depots/GetAll", {}, (res) => {
      this.models = res;
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("Depots/Create", this.createModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new DepotModel();
        this.createModalClose?.nativeElement.click();
        this.getList();
      });
    }
  }

  deleteById(model: DepotModel) {
    this.swal.callSwal("Depo Sil?", `${model.name} deposunu silmek istiyormusunuz?`, () => {
      this.http.post<string>("Depots/DeleteById", { id: model.id }, (res) => {
        this.getList();
        this.swal.callToast(res, "info");
      })
    })
  }

  get(model: DepotModel) {
    this.updateModel = { ...model };
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("Depots/Update", this.updateModel, (res) => {
        this.swal.callToast(res,"info");
        this.updateModalClose?.nativeElement.click();
        this.getList();
      });
    }
  }
}
