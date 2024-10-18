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
  private config: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private error: ErrorService
  ) { }

  async post<T>(apiUrl: string, body: any, callBack: (res: T) => void, errorCallBack?: () => void) {
    
    await this.loadConfig();
    //
    let baseApiUrl = this.config.apiUrl;

    this.http.post<ResultModel<T>>(`${baseApiUrl}/${apiUrl}`, body, {
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

  async loadConfig(): Promise<void> {
    try {
      this.config = await this.http.get('/assets/config.json').toPromise();
      console.log(this.config);
    } catch (error) {
      console.error('Config loading error:', error);
    }
  }

  getConfig(): any {
    return this.config;
  }
}
