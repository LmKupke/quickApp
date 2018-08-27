import { Injectable } from '@angular/core';
import {Subscription} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class NewUserAdded extends Subscription {
  document = gql`
    subscription {
      userCreated {
        id
        name
        username
        password
        location
        age
      }
    }
  `;
}
