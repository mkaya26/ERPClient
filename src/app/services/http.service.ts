import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../constants';
import { ResultModel } from '../models/result.model';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl: string = "";

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private error: ErrorService
  ) { }

  post<T>(apiUrl: string, body: any, callBack: (res: T) => void, errorCallBack?: () => void) {
    console.log(this.apiUrl);
    this.http.post<ResultModel<T>>(`${this.apiUrl}/${apiUrl}`, body, {
      headers: {
        "Authorization": "Bearer " + this.auth.token
      }
    }).subscribe({
      next: (res: any) => {
        if (res.data) {
          callBack(res.data);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
        if (errorCallBack) {
          errorCallBack();
        }
      }
    })
  }

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
    console.log("API URL in MyService:", this.apiUrl);
  }
}
