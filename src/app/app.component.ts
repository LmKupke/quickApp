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

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.apollo.watchQuery({
      query: gql`
        {
          users {
            id
            name
            username
            location
            age
          }
        }
      `
    }).valueChanges.subscribe(result => {
      console.log(result.data);
    });
  }
}
