import { Injectable } from '@angular/core';
import { SignUpModule } from './sign-up.module';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) {
   }

   signUpUser(user: User) {
     return this.http.post('/api/user', user);
   }
}
