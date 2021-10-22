import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';


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
    this.getUser();
  }
  getUser() {
    this.usersService.getUsers().subscribe(
      (res) => {
        this.usersService.users = res;
      }, err => {
        if (err instanceof HttpErrorResponse) {
          this.router.navigate(['/authetication/login'])
        }
      }
    )
  }
  deleteUser(_id: string, form: NgForm) {
    this.usersService.deleteUser(_id).subscribe(
      (res) => {
        this.getUser();
        this.resetForm(form);
      }
    );
  }

  putUser(form?: NgForm) {
    if (form.value._id) {
      this.usersService.updateUser(form.value).subscribe(
        (res) => {
          this.getUser();
        }, (err) => { console.log(err); }
      )
    };
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.usersService.selectUser = new User();
    }
  }

  updateUser(user: User) {
    this.usersService.selectUser = user;
  }
}
