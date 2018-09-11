import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {
  @Input() message: any;
  myUsername: string;
  constructor(private store: Store) {
    this.store.select(state => state.appState.user.username).subscribe(name => this.myUsername = name);

   }

  ngOnInit() {
  }

}
