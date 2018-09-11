import { TestBed, inject } from '@angular/core/testing';

import { AddUserGqlService } from './add-user-gql.service';

describe('AddUserGqlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddUserGqlService]
    });
  });

  it('should be created', inject([AddUserGqlService], (service: AddUserGqlService) => {
    expect(service).toBeTruthy();
  }));
});
