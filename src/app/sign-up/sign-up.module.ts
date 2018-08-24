import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { SignUpRoutingModule } from './sign-up-routing/sign-up-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    SignUpRoutingModule,
    MaterialModule
  ],
  exports: [],
  declarations: [SignUpFormComponent]
})
export class SignUpModule { }
