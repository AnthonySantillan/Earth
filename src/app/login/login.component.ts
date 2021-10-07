import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: '',
  };
  constructor(private router: Router, private auth: AuthenticationService) { }
  navigateRegister() {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
  }
  Login() {
    this.auth.Login(this.user).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.router.navigate(['/contenido']);

    }, (err) => {
      console.log(err);
    });
  }

}
