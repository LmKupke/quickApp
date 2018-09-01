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
import { TestComponent } from './test/test.component';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloModule, Apollo } from 'apollo-angular';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split, ApolloLink, from } from 'apollo-link';
import { ChatContainerComponent } from './chat/chat-container/chat-container.component';
import { ChatMessageBoxComponent } from './chat/chat-message-box/chat-message-box.component';
import { ChatMessagesComponent } from './chat/chat-messages/chat-messages.component';
import { ChatInputComponent } from './chat/chat-input/chat-input.component';
import { LoginModule } from './login/login/login.module';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { setContext } from 'apollo-link-context';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

const appRoutes: Routes = [
  { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpModule'},
  { path: 'sign-in', loadChildren: './login/login/login.module#LoginModule'},
  { path: '', component: ChatContainerComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ChatContainerComponent,
    ChatMessageBoxComponent,
    ChatMessagesComponent,
    ChatInputComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    SignUpModule,
    ReactiveFormsModule,
    FormsModule,
    LoginModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    NgxsModule.forRoot([AppState]),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      storage: StorageOption.SessionStorage
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    HttpLinkModule,
    ApolloModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {

    const http = httpLink.create({ uri: 'http://localhost:3000/graphql' });

    const ws = new WebSocketLink({
      uri: `ws://localhost:3000/graphql`,
      options: {
        reconnect: true
      }
    });

  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    ws,
    http,
  );

  apollo.create({
    link,
    cache: new InMemoryCache()
  });
}
}
