import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class TokenInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.body.operationName !== "signIn" && request.body.operationName !== "signUp") {
      request = request.clone({
        setHeaders: {
          "x-token": `${sessionStorage.getItem('token')}`
        }
      });
    }

    return next.handle(request);
  }
}
