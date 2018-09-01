import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { TokenInterceptor } from '../../token.interceptor';


const messagesQuery = gql`
query{
  messages {
    id
    message
    user {
      username
      age
      location
    }
  created_at
  }
}
`;

const messageRT = gql`
subscription {
  messageCreated {
	 	id
  	message
    user {
      username
      location
      age
    }
    created_at
  }
}
`;
@Component({
  selector: 'app-chat-message-box',
  templateUrl: './chat-message-box.component.html',
  styleUrls: ['./chat-message-box.component.css'],
  providers: []
})
export class ChatMessageBoxComponent implements OnInit {
  messagesObservable: QueryRef<any>;
  messagesSubscription: Subscription;
  messages: any[];
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.messagesObservable = this.apollo.watchQuery({
      query: messagesQuery,
    });

    this.messagesSubscription = this.messagesObservable.valueChanges.subscribe(({data}) => {
      this.messages = [...data.messages];
    });

    this.messagesObservable.subscribeToMore({
      document: messageRT,
      updateQuery: (previous, {subscriptionData}) => {
        if (!subscriptionData.data) {
          return previous;
        }
        const newMessage = subscriptionData.data.messageCreated;

        return this.messages = [...this.messages, newMessage];
      }
    });
  }

}
