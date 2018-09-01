import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  messageForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private apollo: Apollo) {
    this.messageForm = this.formBuilder.group({
      message: this.formBuilder.control('', Validators.required)
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    this.apollo.mutate({
      mutation: createMessageMutation,
      variables: this.messageForm.value,

    }).subscribe(({data}) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    })
  }

}
