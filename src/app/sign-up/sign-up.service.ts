import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { gql, Apollo } from "apollo-angular-boost";
import { AddUserGqlService } from './add-user-gql.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private addUserGQL: AddUserGqlService) {
   }

   signUpUser(user: User) {
    this.addUserGQL.mutate({
      ...user
    });
   }
}
