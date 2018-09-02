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


const userTyping = gql`
mutation typingMessage($status: Boolean!) {
   typingMessage(status: $status)
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
  activeTyping: string[] = [];
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

    this.apollo.subscribe({
      query: gql `
      subscription {
        messageTyping {
          status
          user
        }
      }
      `,
    }).subscribe(({data}) => {
      if (!data.messageTyping.status) {
        this.activeTyping = this.activeTyping.filter(name => name !== data.messageTyping.user);
      } else {
        this.activeTyping.push(data.messageTyping.user);
      }
    });
  }

}
