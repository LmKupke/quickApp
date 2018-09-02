import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User, UserAuth } from '../../models/user';
import { SignUpSuccessful } from '../store/sign-up.action';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { share } from 'rxjs/operators';


const addUserMutation =  gql`
mutation signUp($name: String!, $username: String!, $password: String!, $location: String, $age: Int) {
  signUp(name: $name, username: $username, password: $password, location: $location, age: $age) {
    user {
      username
   	  location
    	age
    }
    token
  }
}
`;

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  uniqueUsername = '';
  private formSubmitAttempt: boolean;

  constructor(private formBuilder: FormBuilder, private apollo: Apollo, private store: Store) {
    this.userForm = this.formBuilder.group({
      name: new FormControl('', [ Validators.required]),
      username: new FormControl('', [ Validators.required]),
      password: new FormControl('', [ Validators.required,  Validators.minLength(4)]),
      location: new FormControl('', [ Validators.required]),
      age: new FormControl('', [ Validators.required ])
    });
  }

  ngOnInit() {
  }

  isFieldInvalid(field: string) {
    return (
      (!this.userForm.get(field).valid && this.userForm.get(field).touched) ||
      (this.userForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    this.user = {
      ...this.userForm.value
    };
    this.formSubmitAttempt = true;

    this.apollo.mutate({
     mutation: addUserMutation,
     variables: {
      username: this.user.username,
      name: this.user.name,
      password: this.user.password,
      location: this.user.location,
      age: <number>this.user.age
     }
    }).subscribe(({data}) => {
      console.log('got data', data );
      sessionStorage.setItem('token', data.signUp.token);
      this.store.dispatch(new SignUpSuccessful(<UserAuth>data.signUp.user));

       this.userForm.reset();
       this.store.dispatch(new Navigate(['/']));
    }, (error) => {
      console.log('there was an error', error);
    });

  }

}

