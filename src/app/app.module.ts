import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/containers/chat/chat.component';
import { HomeComponent } from './home/container/home/home.component';
import { SigninComponent } from './signin/containers/signin/signin.component';
import { SignupComponent } from './signup/containers/signup/signup.component';
import { ThreadsComponent } from './chat/components/threads/threads.component';
import { ChatInputsComponent } from './chat/components/chat-inputs/chat-inputs.component';
import { UserListComponent } from './chat/containers/user-list/user-list.component';
import { ChatUserComponent } from './chat/components/chat-user/chat-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';


const appRoutes: Routes = [
  { path: 'chat' , component: ChatComponent},
  { path: 'sign-up', component: SignupComponent },
  { path: 'sign-in', component: SigninComponent},
  { path: '', component: HomeComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ThreadsComponent,
    ChatInputsComponent,
    UserListComponent,
    ChatUserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true}),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
