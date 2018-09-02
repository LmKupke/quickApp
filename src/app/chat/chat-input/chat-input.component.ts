import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'apollo-link';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

const createMessageMutation = gql`
  mutation createMessage($message: String!) {
    createMessage(message: $message) {
      id
      message
      created_at
      user {
        username
        age
        location
      }
    }
  }
`;

const userTyping = gql`
mutation typingMessage($status: Boolean!) {
   typingMessage(status: $status)
}
`;

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  messageForm: FormGroup;
  test: Subscription;
  messageControl: FormControl;
  constructor(private formBuilder: FormBuilder, private apollo: Apollo) {
    this.messageForm = this.formBuilder.group({});
    this.messageControl = new FormControl('', [Validators.required]);
    this.messageForm.registerControl('message', this.messageControl);

    this.test = this.messageControl.statusChanges.pipe(
      distinctUntilChanged()
    ).subscribe((typing) => {
      const status = typing === "VALID" ? true : false;
      this.apollo.mutate({
        mutation: userTyping,
        variables: {
          status: status
        }
      }).subscribe();
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    this.apollo.mutate({
      mutation: createMessageMutation,
      variables: this.messageForm.value,

    }).subscribe(({data}) => {
      this.messageForm.reset();
    }, (error) => {
      console.log(error);
    })
  }

}
