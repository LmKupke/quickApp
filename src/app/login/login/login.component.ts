import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { SignUpSuccessful } from '../../sign-up/store/sign-up.action';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private formSubmitAttempt: boolean;
  userLoginQuery: QueryRef<any>;
  constructor(private formBuilder: FormBuilder, private store: Store, private apollo: Apollo) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [ Validators.required]),
      password: new FormControl('', [ Validators.required,  Validators.minLength(4)])
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    const query = {
      ...this.loginForm.value
    };
    this.formSubmitAttempt = true;
    this.userLoginQuery = this.apollo.watchQuery({
      query: gql`
      query user($username: String!, $password: String!) {
        user(username: $username, password: $password) {
            username
            password
            name
            location
            age
          }
      }
      `,
      variables: {
        username: query.username,
        password: query.password
      }
    });

    this.userLoginQuery.valueChanges.subscribe(({data}) => {
      this.store.dispatch(new SignUpSuccessful(data.user));
      this.store.dispatch(new Navigate(['/']));
    });

  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

}
