import { Injectable } from '@angular/core';
import { gql } from "apollo-angular-boost";
import { Mutation } from "apollo-angular";


@Injectable({
  providedIn: 'root'
})
export class AddUserGqlService extends Mutation {
  document = gql`
  mutation addUser($name: String!, $username: String!, $password: String!, $location: String, $age: Int) {
    addUser(name: $name, username: $username, password: $password, location: $location, age: $age) {
      name
      username
      location
      age
      password
    }
  }
  `;

}
