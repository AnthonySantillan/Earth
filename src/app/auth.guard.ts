import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public _authService: AuthenticationService,

    public router: Router) { }
  canActivate(): boolean {
    if (this._authService.Loged()) {
      return true;
    }
    this.router.navigate(['/authentication/login']);
    return false;
  }

}
