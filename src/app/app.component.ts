import { APP_INITIALIZER, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from './services/config.service';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  ngOnInit(): void {

  }
}
