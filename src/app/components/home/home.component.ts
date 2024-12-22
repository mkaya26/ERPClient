import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  ngOnInit() {
    if (!localStorage.getItem('isReloaded')) {
      localStorage.setItem('isReloaded', 'true');
      window.location.reload();
    } else {
      localStorage.removeItem('isReloaded');
    }
  }
  
}
