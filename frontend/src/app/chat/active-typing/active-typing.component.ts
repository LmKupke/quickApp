import { Component, OnInit, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-active-typing',
  templateUrl: './active-typing.component.html',
  styleUrls: ['./active-typing.component.css']
})
export class ActiveTypingComponent implements OnInit {
  @Input() username: String;
  myUsername: string;
  constructor(private store: Store) {
    this.store.select(state => state.appState.user.username).subscribe(name => this.myUsername = name);
 }

  ngOnInit() {

  }

}
