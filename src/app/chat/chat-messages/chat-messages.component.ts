import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {
  @Input() message: any;
  constructor() { }

  ngOnInit() {
  }

}
