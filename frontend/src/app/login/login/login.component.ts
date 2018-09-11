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
    this.apollo.mutate({
      mutation: gql`
      mutation signIn($username: String!, $password: String!) {
        signIn(username: $username, password: $password) {
            user {
              username
              location
              age
            }
            token
          }
      }
      `,
      variables: {
        username: query.username,
        password: query.password
      },
      fetchPolicy: 'no-cache'
    }).subscribe(({data}) => {
      if (sessionStorage.getItem('token')) {
        sessionStorage.removeItem('token');
        sessionStorage.setItem('token', data.signIn.token);

      }
      sessionStorage.setItem('token', data.signIn.token);
      this.store.dispatch(new SignUpSuccessful(data.signIn.user));
      this.loginForm.reset();
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
