import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { AppState } from './store/app.state';
import { ApolloBoostModule, ApolloBoost } from "apollo-angular-boost";

const appRoutes: Routes = [
  {path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpModule'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    SignUpModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserAnimationsModule,
    NgxsModule.forRoot([AppState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    ApolloBoostModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(boost: ApolloBoost) {
    boost.create({
      uri: "http://localhost:3000/graphql"
    });
  }

}
