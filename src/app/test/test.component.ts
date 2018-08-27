import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { NewMessageService } from '../new-message.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewUserAdded } from '../newUser.gql';
import { User } from '../models/user';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  users: any[] = [];
  user: any;
  allUsersQuery: QueryRef<any>;
  allUsersSubscription: Subscription;
  constructor(newMessage: NewMessageService, public apolloClient: Apollo) {



  }

  ngOnInit() {
    this.allUsersQuery = this.apolloClient.watchQuery({
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

    this.allUsersSubscription = this.allUsersQuery.valueChanges.subscribe(({data}) => {
      this.users = [ ...data.users ];
    });
    this.allUsersQuery.subscribeToMore({
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
        if (!subscriptionData.data) {
          return previous;
        }
        const newUser = subscriptionData.data.userCreated;

        return this.users = [...previous.users, newUser]
      }
    });
   }

}
