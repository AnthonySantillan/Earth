import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  user = {
    name: '',
    lastname: '',
    card: '',
    email: '',
    password: ''
  };
  userId: any;
  constructor(public usersService: UsersService, private router: Router, public auth: AuthenticationService) {

  }


  ngOnInit(): void {
    this.userId = this.auth.getUser();
    console.log(this.userId);
  }

}
