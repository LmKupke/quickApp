import { Injectable } from '@angular/core';
import {Subscription} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class NewMessageService extends Subscription {
  document = gql`
    subscription {
      messageCreated {
        id
        message
        date
        user {
          id
          username
        }
      }
    }
  `;
}
