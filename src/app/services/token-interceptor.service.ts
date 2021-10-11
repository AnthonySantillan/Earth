import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthenticationService) { }

  intercept(req, next) {
    let tokenizeReq = req.clone({
      setHeaders: {
        authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
