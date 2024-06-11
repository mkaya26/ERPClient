import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankComponent } from '../components/blank/blank.component';
import { SectionComponent } from '../components/section/section.component';
import { FormsModule } from '@angular/forms';
import { FormValidateDirective } from 'form-validate-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BlankComponent,
    SectionComponent,
    FormValidateDirective
  ],
  exports:[
    CommonModule,
    FormsModule,
    BlankComponent,
    SectionComponent,
    FormValidateDirective
  ]
})
export class SharedModule { }
