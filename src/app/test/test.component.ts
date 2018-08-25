import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.apollo.watchQuery({
      query: gql`
        {
          users {
            id
            name
            username
            location
            age
          }
        }
      `
    }).valueChanges.subscribe(result => {
      console.log(result.data);
    });
  }

}
