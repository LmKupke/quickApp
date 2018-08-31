import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { SignUpSuccessful } from '../store/sign-up.action';
import { Store } from '@ngxs/store';
import { AddUserGqlService } from '../add-user-gql.service';
import { Navigate } from '@ngxs/router-plugin';


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

  constructor(private formBuilder: FormBuilder, private addUserGQL: AddUserGqlService, private store: Store) {
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

    this.addUserGQL.mutate({
        ...this.user
      }).subscribe(({data}) => {
      console.log('got data',  <User>data );
      this.store.dispatch(new SignUpSuccessful(<User>data));
      this.userForm.reset();
      this.store.dispatch(new Navigate(['/']));
    }, (error) => {
      console.log('there was an error', error);
    });

  }

}

