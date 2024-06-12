import { APP_INITIALIZER, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from './services/config.service';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers:[
    ConfigService
  ],
  template: `
  <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  apiUrl: string = "";

  constructor(private configService: ConfigService,private httpService:HttpService) { }

  ngOnInit() {
    this.configService.apiUrl$.subscribe(apiUrl => {
      this.apiUrl = apiUrl;
      console.log("API URL in AppComponent:", this.apiUrl);
      this.httpService.setApiUrl(apiUrl);
    });
    this.configService.loadConfig();
  }
}
