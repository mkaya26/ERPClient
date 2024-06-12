import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private apiUrlSubject = new Subject<string>();
  apiUrl$ = this.apiUrlSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadConfig() {
    this.http.get('/assets/config.json').subscribe((config: any) => {
      console.log("Config Loaded:", config);
      this.apiUrlSubject.next(config.apiUrl);
    }, (error) => {
      console.error("Could not load config.json", error);
    });
  }
  
}
