import { Injectable } from '@angular/core';
import { SignUpModule } from './sign-up.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) {
   }

   signUpUser(user): Observable<any> {
      return this.http.post("/api/user", user);
   }
}
