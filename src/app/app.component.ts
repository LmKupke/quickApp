import { Component } from '@angular/core';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Apollo, gql } from 'apollo-angular-boost';
import { User } from './models/user';
import { Observable, Subscription } from 'rxjs';
import { AppState, AppStateModel } from './store/app.state';
import { SignUpSuccessful } from './sign-up/store/sign-up.action';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: User[];
  loggedIn$: Observable<boolean>;
  loggedIn = false;
  loggedInSubscription: Subscription;
  constructor(private store: Store, private apollo: Apollo, private actions: Actions) {


  }

  ngOnInit(): void {
    this.actions.pipe(ofActionDispatched(SignUpSuccessful)).subscribe(() => {
      this.loggedIn = true;
    });
  }

  goToSignUp() {
    this.store.dispatch(new Navigate(['/sign-up']));
  }

  goToSignIn() {
    this.store.dispatch(new Navigate(['/sign-in']));
  }

  ngOnDestroy(): void {
  }


}
