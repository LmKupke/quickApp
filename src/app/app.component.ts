import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Apollo, gql } from 'apollo-angular-boost';
import { User } from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: User[];
  constructor(private store: Store, private apollo: Apollo) {

  }

  goToSignUp() {
    this.store.dispatch(new Navigate(['/sign-up']));
  }


}
