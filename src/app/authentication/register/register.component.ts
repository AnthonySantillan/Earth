import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    name: '',
    lastname: '',
    card: '',
    email: '',
    password: '',
  };
  constructor(private router: Router, private auth: AuthenticationService) { }
  navigateLogin() {
    this.router.navigate(['/authentication/login']);
  }

  ngOnInit(): void {
  }

  Register() {
    this.auth.Register(this.user).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigate(['/authentication/login']);
    }, (err) => {
      console.log(err);
    });
  }


}
