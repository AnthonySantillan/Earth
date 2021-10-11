import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private uri = 'http://localhost:4000';
  token: string | undefined;
  constructor(private httpClient: HttpClient, private router: Router) { }
  Login(user: any) {
    return this.httpClient.post<any>(this.uri + '/login', user)
      .pipe(
        map((res) => res)
      );
  }
  Loged() {
    return !!localStorage.getItem('token');
  }
  Register(user: {}) {
    return this.httpClient.post<any>(this.uri + '/register', user)
      .pipe(
        map((res) => res)
      );
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
