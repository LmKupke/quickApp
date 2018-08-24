import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';
const appRoutes: Routes = [
  { path: 'sign-up', component: SignUpFormComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class SignUpRoutingModule { }
