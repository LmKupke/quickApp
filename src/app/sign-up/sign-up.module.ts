import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { SignUpRoutingModule } from './sign-up-routing/sign-up-routing.module';
import { MaterialModule } from '../material/material.module';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpService } from './sign-up.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    SignUpRoutingModule,
    MaterialModule,
    NgxsFormPluginModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [SignUpFormComponent]
})
export class SignUpModule { }
