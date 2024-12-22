import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { UserModel } from '../../models/user.model';
import { SwallService } from '../../services/swall.service';
import { AuthService } from '../../services/auth.service';
import { UserPasswordChangeModel } from '../../models/user-password-change.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  model: UserModel = new UserModel();
  passwordModel: UserPasswordChangeModel = new UserPasswordChangeModel();

  constructor(
    private http: HttpService,
    private swal: SwallService,
    private auth: AuthService) {

  }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.http.post<UserModel>("User/GetById", { id: this.auth.user.id }, (res) => {
      this.model = res;
    });
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("User/Update", this.model, (res) => {
        this.swal.callToast(res, "info");
      });
    }
  }

  passwordChange(form: NgForm) {
    this.passwordModel.id = this.auth.user.id;
    if (form.valid) {
      this.http.post<string>("User/PasswordChange", this.passwordModel, (res) => {
        this.swal.callToast(res, "info");
      });
    }
  }
}
