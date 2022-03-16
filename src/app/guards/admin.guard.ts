import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuariosService,
    private router: Router
  ) { }
  canActivate() {
    if (this._usuarioService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: 'Primero logueese o registrese',

    });
    // return false;

  }



}