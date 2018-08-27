import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { NewMessageService } from '../new-message.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewUserAdded } from '../newUser.gql';
import { User } from '../models/user';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {
  users: any;
  user: any;
  constructor(newMessage: NewMessageService, public apolloClient: Apollo) {



  }

  ngOnInit() {
    const allUsers = this.apolloClient.watchQuery({
      query: gql`
        query {
          users {
            name
            username
            age
            location
            password
          }
        }
      `
    });

    allUsers.subscribeToMore({
      document: gql`
      subscription {
        userCreated {
          name
          username
          password
          location
          age
        }
      }`,
      updateQuery: (previous, { subscriptionData }) => {
        return previous.users.push(subscriptionData.data.userCreated);
      }
    });
    const querySubscription = allUsers.valueChanges.subscribe((response) => {
      this.users.push(response);
    });
   }

}
