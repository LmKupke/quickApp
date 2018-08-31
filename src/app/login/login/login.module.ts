import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {path: 'sign-in', component: LoginComponent }
];



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NgxsFormPluginModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
