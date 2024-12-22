import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { UserPipe } from '../../pipes/user.pipe';
import { UserModel } from '../../models/user.model';
import { SwallService } from '../../services/swall.service';
import { HttpService } from '../../services/http.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModule, UserPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  pageName: string = "";
  search: string = "";
  models: UserModel[] = [];

  createModel: UserModel = new UserModel();
  updateModel: UserModel = new UserModel();

  @ViewChild("createModalCloseBtn") createModalClose: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalClose: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private http: HttpService,
    private swal: SwallService
  ) { }

  ngOnInit(): void {
    this.pageName = "Kullanıcılar";
    this.getList();
  }
  //
  getList() {
    this.http.post<UserModel[]>("User/GetAll", {}, (res) => {
      this.models = res;
    });
  }
  //
  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("User/Create", this.createModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new UserModel();
        this.createModalClose?.nativeElement.click();
        this.getList();
      });
    }
  }
  //
  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("User/Update", this.updateModel, (res) => {
        this.swal.callToast(res, "info");
        this.updateModalClose?.nativeElement.click();
        this.getList();
      });
    }
  }
  //
  deleteById(id: string) {
    this.swal.callSwal("Kullanıcıyı Sil?", `Kullanıcıyı silmek istiyormusunuz?`, () => {
      this.http.post<string>("User/DeleteById", { id: id }, (res) => {
        this.getList();
        this.swal.callToast(res, "info");
      })
    });
  }
  //
  get(model: UserModel) {
     console.log(model);
     this.updateModel = { ...model };
  }
}
