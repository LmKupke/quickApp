import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUpService } from '../sign-up.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService) {
    this.userForm = this.formBuilder.group({
      name: new FormControl('', [ Validators.required]),
      username: new FormControl('', [ Validators.required]),
      password: new FormControl('', [ Validators.required,  Validators.minLength(4)]),
      location: new FormControl('', [ Validators.required]),
      age: new FormControl('', [ Validators.required])
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.user = {
      ...this.userForm.value
    };

    this.signUpService.signUpUser(this.user).subscribe();
  }

}

export interface User {
  name: String;
  username: String;
  password: String;
  location: String;
  age: number;
}
