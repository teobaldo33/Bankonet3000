import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormErrorComponent } from './form-error/form-error.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormErrorComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FormErrorComponent
  ]
})
export class SharedModule { }
